export function sortApiAscending() {
    return (a, b) => ((a.position - b.position) || (a.id - b.id))
}

export function newData(formData, filterItems = []) {
    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
        if (filterItems.includes(key)) return;
        if (value === undefined || value === null) return;
        data.append(key, value);
    });

    return data
}

export function changeModel(action, postModel, editModel) {
    if (action.toLowerCase() === 'add') {
        return (data, id) => postModel(data)
    }
    return (data, id) => editModel({modelData: data, id})
}

export function moveModel(models, editModel, dispatch) {

    return (modelIndex, limit) => {
        const indexUp = limit !== 0 ? 1 : null;
        const indexDown = limit === 0 ? -1 : null;

        if (!limit && modelIndex === 0) return;
        if (limit && modelIndex > models.length - 1) return;

        const model = models[modelIndex]
        const modelB = models[modelIndex + (indexUp || indexDown)]
        const modelId = model.id
        const modelBId = modelB.id

        dispatch(editModel({modelData: {position: modelB.position}, id: modelId}))
        dispatch(editModel({modelData: {position: model.position}, id: modelBId}))
    }
}

