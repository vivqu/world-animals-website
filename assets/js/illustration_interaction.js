const attachListeners = () => {
    const headImages = document.getElementsByClassName('illustrationImage');
    for (var i = 0; i < headImages.length; i++) {
        let image = headImages[i];
        image.addEventListener('click', changeSelection, false);
    }
}

const getFileNameForImage = (image) => {
    if (image.src == null) {
        return "";
    }
    let pathComponents = image.src.split('/');
    if (pathComponents.length < 2) {
        return "";
    }

    let finalPath = pathComponents.slice(-2);
    let isSelected = finalPath[0] != 'illustrations';
    let animalPath = finalPath[1];
    return { animalPath, isSelected };
}

const changeSelection = (e) => {
    let srcImage = e.srcElement;
    let { animalPath, isSelected } = getFileNameForImage(srcImage);
    console.log(isSelected);
    console.log(animalPath);
    const headImages = document.getElementsByClassName('illustrationImage');
    if (animalPath == null || animalPath.length == 0) {
        return;
    }
    var updatedAnimal = false;
    for (var i = 0; i < headImages.length; i++) {
        let image = headImages[i];
        let results = getFileNameForImage(image);
        let currentAnimalPath = results.animalPath;
        if (currentAnimalPath == animalPath && results.isSelected == false) {
            updatedAnimal = true;
            image.src = 'assets/selected-illustrations/' + currentAnimalPath;
        } else if (isSelected == false && results.isSelected) {
            image.src = 'assets/illustrations/' + currentAnimalPath;
        }
    }
    let animalName = animalPath.split('-')[0];
    if (updatedAnimal && animalName.length > 0) {
        const mainImage = document.getElementsByClassName('illustrationMainImage')[0];
        mainImage.src = 'assets/illustrations-main/' + animalName + '.png';
    }
}
attachListeners();
