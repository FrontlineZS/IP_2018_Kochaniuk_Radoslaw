export default function setCounterOfTo(elementId, value) {
  if (typeof value !== 'number') {
    console.log(`The type of second parameter should be a number, given another: '${value}'.`);
    return;
  }

  if (! elementId) {
    return;
  }

  elementId.innerHTML = value;
}
