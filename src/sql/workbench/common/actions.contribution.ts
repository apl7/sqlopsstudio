/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the Source EULA. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { TaskRegistry } from 'sql/platform/tasks/common/tasks';
import * as Actions from './actions';

import { IJSONSchema } from 'vs/base/common/jsonSchema';
import * as nls from 'vs/nls';

import { SyncActionDescriptor } from 'vs/platform/actions/common/actions';
import { Registry } from 'vs/platform/registry/common/platform';
import { IWorkbenchActionRegistry, Extensions as ActionExtensions } from 'vs/workbench/common/actions';
import { IWorkbenchContributionsRegistry, Extensions as WorkbenchExtensions } from 'vs/workbench/common/contributions';
import { ShowCurrentReleaseNotesAction, ProductContribution } from 'sql/workbench/update/releaseNotes';
import { LifecyclePhase } from 'vs/platform/lifecycle/common/lifecycle';

const backupSchema: IJSONSchema = {
	description: nls.localize('carbon.actions.back', 'Open up backup dialog'),
	type: 'null',
	default: null
};

const restoreSchema: IJSONSchema = {
	description: nls.localize('carbon.actions.restore', 'Open up restore dialog'),
	type: 'null',
	default: null
};

const newQuerySchema: IJSONSchema = {
	description: nls.localize('carbon.actions.newQuery', 'Open a new query window'),
	type: 'null',
	default: null
};

const configureDashboardSchema: IJSONSchema = {
	description: nls.localize('carbon.actions.configureDashboard', 'Configure the Management Dashboard'),
	type: 'null',
	default: null
};

TaskRegistry.registerTask('backup', '', backupSchema, Actions.BackupAction);
TaskRegistry.registerTask('restore', '', restoreSchema, Actions.RestoreAction);
TaskRegistry.registerTask('new-query', '', newQuerySchema, Actions.NewQueryAction);

TaskRegistry.registerTask('configure-dashboard', '', configureDashboardSchema, Actions.ConfigureDashboardAction);

// add product update and release notes contributions
Registry.as<IWorkbenchContributionsRegistry>(WorkbenchExtensions.Workbench)
.registerWorkbenchContribution(ProductContribution, LifecyclePhase.Running);

Registry.as<IWorkbenchActionRegistry>(ActionExtensions.WorkbenchActions)
	.registerWorkbenchAction(new SyncActionDescriptor(ShowCurrentReleaseNotesAction, ShowCurrentReleaseNotesAction.ID, ShowCurrentReleaseNotesAction.LABEL), 'Show Getting Started');
