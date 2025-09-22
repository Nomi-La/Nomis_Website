
export function isUrl(str) {
  if (typeof str !== 'string') return false;
  try {
    const u = new URL(str.trim());
    return u.protocol === 'http:' || u.protocol === 'https:';
  } catch {
    return false;
  }
}

export function sortApiAscending() {
    return (a, b) => ((a.position - b.position) || (a.id - b.id))
}

export function newData(formData, filterItems = []) {
    const data = new FormData();
    const FILE_FIELDS = ['image', 'image2']

    Object.entries(formData).forEach(([key, value]) => {
        if (filterItems.includes(key)) return;
        if (FILE_FIELDS.includes(key)) {
            if (isUrl(value)) return;
        }

        if (value === undefined || value === null) {
            data.append(key, "");
        } else {
            data.append(key, value);
        }
    });

    return data
}

export function imageUpload(setFormData, formData){
    return (e, imageName = 'image') => {
        const image_url_name = `${imageName}_url`
        const file = e.target.files[0];
        if (!file) return;
        setFormData({...formData, [imageName]: file})
        const imageUrl = URL.createObjectURL(file);
        setFormData((prev) => ({...prev, [image_url_name]: imageUrl}));
    };
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

export function autoGrow(e) {
        e.target.style.height = 'auto';
        e.target.style.height = `${e.target.scrollHeight}px`;
    }

