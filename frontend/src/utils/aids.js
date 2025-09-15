

export function sortApiAscending(){
    return (a, b) => ((a.position - b.position) || (a.id - b.id))
 }

export function newData (formData, filterItems=[]){
    const data = new FormData();
    for (let key in formData){
        if (key in filterItems){continue}
        data.append(key, formData[key])
    }
    return data
}

export function changeModel(action, postModel, editModel){
    if (action.toLowerCase() === 'add') {
        return (data, id) => postModel(data)
    }
    return (data, id)=> editModel({modelData: data, id})
}

export function upModel(models, editModel, dispatch){

    return (modelIndex) => {
        if (modelIndex <= 0) return;

        const model = models[modelIndex]
        const modelB = models[modelIndex-1]
        const modelId = model.id
        const modelBId = modelB.id
        console.log('model:', modelId)
        dispatch(editModel({modelData: {position: modelB.position}, id: modelId}))
        dispatch(editModel({modelData: {position: model.position}, id: modelBId}))
    }
}

export function downModel(models, editModel, dispatch){

    return (modelIndex) => {
        if (modelIndex >= (models.length-1)) return;
        const model = models[modelIndex]
        const modelB = models[modelIndex+1]
        const modelId = model.id
        const modelBId = modelB.id

        dispatch(editModel({modelData: {position: modelB.position}, id: modelId}))
        dispatch(editModel({modelData: {position: model.position}, id: modelBId}))
    }
}