import firebase from 'firebase';
import {Actions} from 'react-native-router-flux';
import {
	PROJECT_INFO_UPDATE,
	PROJECT_CREATE,
	PROJECTS_FETCH_SUCCESS,
	PROJECT_SAVE_SUCCESS,
	PROJECTS_FILTER,
	USER_APPLY_TO_PROJECT,
	GET_PROJECT_INFO
} from './types';

export const projectInfoUpdate = ({prop, value}) => {
	return {
		type: PROJECT_INFO_UPDATE,
		payload: {prop, value}
	};
};

export const projectCreate = ({name, description, photoBase64, maxMembers, keywords, vacancies}) => {
	return dispatch => {
		const currentEventKey = firebase.database().ref(`/events`).push().key;
		const currentEventRef = firebase.database().ref(`/events/${currentEventKey}`);
		const {currentUser} = firebase.auth();
		currentEventRef.set(
			{
				name,
				description,
				photoBase64,
				maxMembers,
				keywords,
				createdBy: currentUser.uid
			}
		);

		const currentVacanciesRef = firebase.database().ref(`/events/${currentEventKey}/vacancies`);
		vacancies.forEach(element => {
			currentVacanciesRef.push(
				{
					name: element.name,
					description: element.description,
					skills: element.skills
				}
			);
		});

		dispatch({type: PROJECT_CREATE});
		Actions.main();
	};
};

export const applyToProject = ({projectUid, vacancyUid}) => {
	const {uid} = firebase.auth().currentUser;
	const currentRef = firebase.database().ref(`/events/${projectUid}/vacancies/${vacancyUid}/`);
	currentRef.update({wantTo: uid});
	return dispatch => {
		dispatch({type: USER_APPLY_TO_PROJECT});
	};
};

export const projectsFetch = () => {
	// GET GLOBAL EVENTS
	return dispatch => {
		firebase.database().ref(`/events`)
			.on('value', snapshot => {
				dispatch({
					type: PROJECTS_FETCH_SUCCESS,
					payload: snapshot.val()
				});
			});
	};
};

export const projectsFilter = (searchString, arr) => {
	if (!searchString) {
		return {
			type: PROJECTS_FILTER,
			payload: arr
		};
	}

	const filteredProjects = arr.filter(project =>
		project.keywords.toLowerCase().includes(searchString.toLowerCase()) ||
		project.name.toLowerCase().includes(searchString.toLowerCase())
	);

	return {
		type: PROJECTS_FILTER,
		payload: filteredProjects
	};
};

// export const getProjectInfo = ({projectUid}) => {
// 	dispatch(
// 		{
// 			type: GET_PROJECT_INFO,
// 			payload: projectUid
// 		}
// 	);
// 	Actions.projectInfo();
// };

// -----------DEPRECATED-----------

export const projectSave = ({name, count, priority, uid}) => {
	const {currentUser} = firebase.auth();

	return dispatch => {
		firebase.database().ref(`/users/${currentUser.uid}/tasks/${uid}`)
			.set({name, count, priority})
			.then(() => {
				dispatch({type: PROJECT_SAVE_SUCCESS});
				Actions.main();
			});
	};
};

export const projectDelete = ({uid}) => {
	const {currentUser} = firebase.auth();

	return () => {
		firebase.database().ref(`/users/${currentUser.uid}/tasks/${uid}`)
			.remove()
			.then(() => {
				Actions.main();
			});
	};
};
