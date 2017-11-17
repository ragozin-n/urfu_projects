import React from 'react';
import {Actions, Scene, Router} from 'react-native-router-flux';
import LoginForm from './components/LoginForm';
import TasksList from './components/TasksList';
import TaskCreateForm from './components/TaskCreateForm';
import TaskEditForm from './components/TaskEditForm';

const RouterComponent = () => {
	return (
		<Router>
			<Scene key="root" hideNavBar>
				<Scene key="auth" hideNavBar>
					<Scene
						key="login"
						component={LoginForm}
					/>
				</Scene>

				<Scene key="main">
					<Scene
						key="tasks"
						type="reset"
						component={TasksList}
						panHandlers={null}
						initial
						hideNavBar
					/>

					<Scene
						key="createTask"
						component={TaskCreateForm}
						panHandlers={null}
						hideNavBar
					/>

					<Scene
						key="editTask"
						component={TaskEditForm}
						panHandlers={null}
						hideNavBar
					/>
				</Scene>
			</Scene>
		</Router>
	);
};

export default RouterComponent;
