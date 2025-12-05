// Minimal UI logic for GrowthLab Experiment Flow Visualizer
// Sends messages to code.ts when buttons are clicked

function send(type: string, payload: any = {}) {
  parent.postMessage({ pluginMessage: { type, ...payload } }, '*');
}

document.getElementById('create-experiment')!.onclick = () => {
  const name = prompt('Experiment name?') || 'Untitled';
  send('CREATE_EXPERIMENT', { name });
};

document.getElementById('add-variant')!.onclick = () => {
  const stepId = prompt('Step ID to add variant to?');
  const variantTitle = prompt('Variant title?') || 'Variant';
  if (stepId) send('ADD_VARIANT', { stepId, variantTitle });
};

document.getElementById('add-step')!.onclick = () => {
  const sourceVariantId = prompt('Source Variant ID?');
  const stepTitle = prompt('New Step Title?') || 'Step';
  if (sourceVariantId) send('ADD_STEP', { sourceVariantId, stepTitle });
};

document.getElementById('mark-winner')!.onclick = () => {
  const variantId = prompt('Variant ID to mark as winner?');
  if (variantId) send('MARK_WINNER', { variantId });
};

document.getElementById('launch-winner')!.onclick = () => {
  const stepId = prompt('Step ID to launch winner for?');
  if (stepId) send('LAUNCH_WINNER', { stepId });
};

document.getElementById('auto-layout')!.onclick = () => {
  send('AUTO_LAYOUT');
};
