figma.showUI(__html__, { width: 400, height: 600 });

figma.ui.onmessage = async (msg) => {
  if (msg.type === 'create-experiment-skeleton') {
    // Example: show a notification
    figma.notify('Experiment skeleton created!');
    // Add your experiment creation logic here
  }
};
