const convertFormWithFile = (body) => {
    console.log(body);

    let formData = new FormData();

    body.files.forEach((file, index) => {
        formData.append(`files[${index}]`, file);
    });

    delete body.files;

    Object.keys(body).forEach((key) => {
        formData.append(key, body[key]);
    })

    return formData; 
}

export default convertFormWithFile;