import firebase from 'firebase';
import {Actions} from 'react-native-router-flux';
import fastFilter from 'fast-filter';
import {
	PROJECT_CREATE,
	PROJECTS_FETCH_SUCCESS,
	PROJECTS_FILTER,
	APPLY_TO_PROJECT_SUCCESS,
	CURATOR_PROJECT_FETCH,
	USER_HIRED,
	ERROR_TOAST,
	SUCCESS_TOAST
} from './types';

// Событие создания проекта куратором
export const projectCreate = ({name, description, photoBase64, keywords}) => {
	return dispatch => {
		if (!name) {
			dispatch({type: ERROR_TOAST, payload: new Error('Trying to create project with emply name')});
			return;
		}
		if (!description) {
			dispatch({type: ERROR_TOAST, payload: new Error('Trying to create project with emply description')});
			return;
		}
		if (!photoBase64) {
			dispatch({type: ERROR_TOAST, payload: new Error('Trying to create project with blank photo')});
			return;
		}
		if (!keywords) {
			dispatch({type: ERROR_TOAST, payload: new Error('Trying to create project with emply keywords array')});
			return;
		}

		const currentEventKey = firebase.database().ref(`/events`).push().key;
		const currentEventRef = firebase.database().ref(`/events/${currentEventKey}`);
		const {uid} = firebase.auth().currentUser;
		//const currentVacanciesRef = firebase.database().ref(`/events/${currentEventKey}/vacancies`);

		currentEventRef.set(
			{
				name,
				description,
				photoBase64,
				keywords,
				createdBy: uid
			}
		);

		// vacancies.forEach(element => {
		// 	currentVacanciesRef.push(
		// 		{
		// 			name: element.name,
		// 			description: element.description,
		// 			skills: element.skills
		// 		}
		// 	);
		// });

		dispatch({type: PROJECT_CREATE});
		dispatch({type: SUCCESS_TOAST, payload: `Проект "${name}" успешно создан!`});
		Actions.main();
	};
};

// Событие оставления заявки студента на вакансию в проекте
export const applyToProject = ({projectUid, vacancyUid}) => {
	return dispatch => {
		const {uid} = firebase.auth().currentUser;

		// Верифицируем возможность пользователя оставить заявку
		_isUserCanApplyToProject(uid, projectUid)
			.then(() => {
				// Если все хорошо, то
				const projectRef = firebase.database().ref(`/events/${projectUid}/vacancies/${vacancyUid}/candidates`);

				// Записываем uid пользователя в массив кандидатов проекта
				projectRef.update(
					{
						[uid]: true
					}
				);

				const userProjectRef = firebase.database().ref(`/users/${uid}/myProjects/`);

				// Записываем uid проекта в пользовательский массив проектов
				userProjectRef.update(
					{
						[projectUid]: false
					}
				);

				dispatch({type: APPLY_TO_PROJECT_SUCCESS});
				dispatch({type: SUCCESS_TOAST, payload: `Заявка успешно отправлена куратору!`});
			},
				err => dispatch({type: ERROR_TOAST, payload: err})
			);
	};
};

// Событие принятия студента в проект куратором
export const hireStudentToProject = ({projectUid, vacancyUid, studentUid}) => {
	return dispatch => {
		// Проверим, может ли студент быть принят в проект
		_isUserCanApplyToProject(studentUid, projectUid)
			.then(() => {
				// Если студент имеет возможность быть принятым в проект
				// установим значение /myProjects/projectUid : true
				// Это обозначает текущий активный проект студента
				firebase
					.database()
					.ref(`/users/${studentUid}/myProjects`)
					.update({
						[projectUid]: true
					});

				// Закроем текущую вакансию, путем
				// удаления массива кандидатов и обновления поля employedBy
				const vacancy = firebase.database().ref(`/events/${projectUid}/vacancies/${vacancyUid}`);
				vacancy
					.update({
						employedBy: studentUid
					});
				vacancy.child('candidates').remove();
				dispatch({type: USER_HIRED});
				dispatch({type: SUCCESS_TOAST, payload: `Студент принят в проект! Успешной работы!`});
			}, err => dispatch({type: ERROR_TOAST, payload: err}));
	};
};

// Подписчик на список всех проектов
export const projectsFetch = ({isCurator, uid}) => {
	const eventsRef = firebase.database().ref(`/events`);

	return dispatch => {
		eventsRef
			.on('value', snapshot => {
				if (isCurator) {
					const initProjects = _.map(snapshot.val(), (val, uid) => {
						return {...val, uid};
					}).filter(project => project.createdBy === uid);
					dispatch({
						type: PROJECTS_FETCH_SUCCESS,
						projects: snapshot.val(),
						initProjects
					});
				} else {
					const projects = _.map(snapshot.val(), (val, uid) => ({...val, uid}));
					dispatch({
						type: PROJECTS_FETCH_SUCCESS,
						projects
					});
				}
			});
	};
};

// Событие фильтрации проектов
export const projectsFilter = (searchString, arr) => {
	if (!searchString) {
		return {
			type: PROJECTS_FILTER
		};
	}

	const filteredProjects = fastFilter(arr,
		project =>
			project.keywords.toLowerCase().includes(searchString.toLowerCase()) ||
			project.name.toLowerCase().includes(searchString.toLowerCase()) ||
			project.keywords.includes(searchString.toLowerCase())
	);

	return {
		type: PROJECTS_FILTER,
		payload: filteredProjects
	};
};

// Событие запроса списка кандидатов на конкретный проект
export const getCandidates = ({uid, isCurator, currentProject}) => {
	if (!isCurator) {
		throw new Error(`${uid} trying to fetch curator events, while isCurator field is false`);
	}
	return async dispatch => {
		try {
			const projects = await _searchForCandidates({uid, projectUid: currentProject.uid});

			// Нельзя фильтровать массив асинхронно. Поэтому тут я написал хелпер для этой операции на промисах.
			const result = await filter(projects, async item => {
				return _isUserActiveProjectIsThis(item.candidate.key, currentProject.uid);
			});
			dispatch({type: CURATOR_PROJECT_FETCH, payload: result});
			Actions.appliesForm({applies: result, currentProject, uid});
		} catch (err) {
			dispatch({type: ERROR_TOAST, payload: err});
		}
	};
};

// Хелпер для асинхронной фильтрации массива
async function filter(arr, callback) {
	return (await Promise.all(arr.map(async item => {
		return (await callback(item)) ? item : undefined;
	}))).filter(i => i !== undefined);
}

// Хелпер для запроса кандидатов у базы данных
const _searchForCandidates = ({projectUid}) => new Promise(resolve => {
	const candidates = [];
	// Просто ужасная функция, но иначе на текущий момент в firebase нельзя. Слишком вложенные данные.

	// Берем свободные вакансии
	firebase
		.database()
		.ref(`/events/${projectUid}/vacancies`)
		.orderByChild('employedBy')
		.equalTo('')
		.once('value', snapshot => {
			// Для каждой вакансии
			snapshot.forEach(vacancy => {
				const _vacancy = vacancy.val();
				// Добавляем к каждой вакансии uid, для обратной связи
				_vacancy.uid = vacancy.key;
				const _candidates = _.map(vacancy.val().candidates, (value, key) => ({key, value}));

				// Если на вакансию есть хотя бы 1 заявка
				if (_candidates.length > 0) {
					_candidates.forEach(candidate => {
						candidates.push({
							vacancy: _vacancy,
							candidate
						});
					});
				}
			});
			resolve(candidates);
		});
});

// Хелпер для проверки возможности оставления заявки в проект
const _isUserCanApplyToProject = (uid, projectUid) => new Promise((resolve, reject) => {

	// Проверяем на куратора
	firebase
		.database()
		.ref(`/users/${uid}`)
		.once('value', snapshot => {
			if (snapshot.val().isCurator) {
				reject(new Error('Curators dont have persimmisions to apply'));
			}
		});

	// Если не куратор, поехали дальше
	firebase
		.database()
		.ref(`/users/${uid}/myProjects`)
		.once('value', snapshot => {
			const userApplies = _.map(snapshot.val(), (value, key) => ({key, value}));

			// У пользователя есть другие активные проекты
			if (userApplies.filter(
					project => project.value === true && project.key !== projectUid
				).length > 0) {
				reject(new Error('User already in project.'));
			}

			// У пользователя болье 3 проектов с заявками не включая текущий
			if (userApplies.length === 3 &&
				userApplies.filter(
						project => project.key === projectUid
				).length === 0) {
				reject(new Error('Max applies count reached.'));
			}
			resolve(userApplies);
		});
});

// Хелпер для добавления uid к проекту. Временно не используется.
// Зачем он написан тоже загадка.
export const _updateProject = projectUid => new Promise(resolve => {
	firebase
		.database()
		.ref(`/events/${projectUid}`)
		.once('value', snapshot => {
			const project = snapshot.val();
			project.uid = projectUid;
			resolve(project);
		});
});

// Хелпер для асинхронной проверки активных проектов студента
const _isUserActiveProjectIsThis = (uid, projectUid) => new Promise(resolve => {
	firebase
		.database()
		.ref(`/users/${uid}/myProjects`)
		.once('value', async snapshot => {
			const userApplies = await _.map(snapshot.val(), (value, key) => ({key, value}));

			// Пользовательский активный проект не является тем, который был передан в качестве параметра
			resolve(userApplies.filter(item => item.value === true && item.key !== projectUid).length === 0);
		});
});
