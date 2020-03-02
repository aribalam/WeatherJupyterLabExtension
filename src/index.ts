import {
  JupyterFrontEnd, JupyterFrontEndPlugin
} from '@jupyterlab/application';

import {SidePanel} from './sidepanel';

const extension: JupyterFrontEndPlugin<void> = {
  id: 'weatherext',
  autoStart: true,
  activate: (app: JupyterFrontEnd) => {

    console.log('JupyterLab extension weatherext is activated!');
    
    // Create a Side Panel and add it to the left area
    const sidePanel = new SidePanel();
    sidePanel.addClass('side-panel');
    app.shell.add(sidePanel, 'left');

  }
};

export default extension;
