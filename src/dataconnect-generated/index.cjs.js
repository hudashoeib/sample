const { queryRef, executeQuery, mutationRef, executeMutation, validateArgs } = require('firebase/data-connect');

const connectorConfig = {
  connector: 'example',
  service: 'sample',
  location: 'us-east4'
};
exports.connectorConfig = connectorConfig;

const createUserRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateUser');
}
createUserRef.operationName = 'CreateUser';
exports.createUserRef = createUserRef;

exports.createUser = function createUser(dc) {
  return executeMutation(createUserRef(dc));
};

const getNotesRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetNotes');
}
getNotesRef.operationName = 'GetNotes';
exports.getNotesRef = getNotesRef;

exports.getNotes = function getNotes(dc) {
  return executeQuery(getNotesRef(dc));
};

const updateNoteRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateNote', inputVars);
}
updateNoteRef.operationName = 'UpdateNote';
exports.updateNoteRef = updateNoteRef;

exports.updateNote = function updateNote(dcOrVars, vars) {
  return executeMutation(updateNoteRef(dcOrVars, vars));
};

const listPublicCategoriesRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListPublicCategories');
}
listPublicCategoriesRef.operationName = 'ListPublicCategories';
exports.listPublicCategoriesRef = listPublicCategoriesRef;

exports.listPublicCategories = function listPublicCategories(dc) {
  return executeQuery(listPublicCategoriesRef(dc));
};
