import React from 'react';
import {Scene, Router} from 'react-native-router-flux';
import LoginForm from './components/login-form';
import ProjectsList from './components/projects-list';
import ProjectCreateForm from './components/project-create-form';
import ProjectEditForm from './components/project-edit-form';

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
						key="projects"
						type="reset"
						component={ProjectsList}
						panHandlers={null}
						initial
						hideNavBar
					/>

					<Scene
						key="createProject"
						component={ProjectCreateForm}
						panHandlers={null}
						hideNavBar
					/>

					<Scene
						key="editProject"
						component={ProjectEditForm}
						panHandlers={null}
						hideNavBar
					/>
				</Scene>
			</Scene>
		</Router>
	);
};

export default RouterComponent;
