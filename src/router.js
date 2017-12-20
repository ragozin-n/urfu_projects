import React from 'react';
import {Scene, Router} from 'react-native-router-flux';
import LoginForm from './components/login_screen/login-form';
import ProjectsList from './components/main_screen/projects_tab/projects-list';
import SettingsForm from './components/main_screen/settings_tab/settings-form';
import ProjectInfo from './components/main_screen/projects_tab/projects_info_section/project-info';
import AppliesForm from './components/main_screen/projects_tab/projects_applies_section/applies-form';
import ProjectCreateForm from './components/create_project_screen/project-create-form';

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
						key="settings"
						component={SettingsForm}
						panHandlers={null}
						hideNavBar
					/>

					<Scene
						key="projectInfo"
						component={ProjectInfo}
						panHandlers={null}
						hideNavBar
					/>

					<Scene
						key="appliesForm"
						component={AppliesForm}
						panHandlers={null}
						hideNavBar
					/>
				</Scene>

				<Scene
					key="createProject"
					component={ProjectCreateForm}
					panHandlers={null}
					hideNavBar
				/>
			</Scene>
		</Router>
	);
};

export default RouterComponent;
