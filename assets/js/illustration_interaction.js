const attachListeners = () => {
    const headImages = document.getElementsByClassName('illustrationImage');
    for (var i = 0; i < headImages.length; i++) {
        let image = headImages[i];
        if (i == 0) {
            image.className += " illustrationImageSelected";
        }
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

    return pathComponents.slice(-1)[0];
}

const changeSelection = (e) => {
    let srcImage = e.srcElement;
    let animalPath = getFileNameForImage(srcImage);
    let isSelected = srcImage.className.includes("illustrationImageSelected");
    if (animalPath == null || animalPath.length == 0) {
        return;
    }
    const headImages = document.getElementsByClassName('illustrationImage');
    var updatedAnimal = false;
    for (var i = 0; i < headImages.length; i++) {
        let image = headImages[i];
        let currentAnimalPath = getFileNameForImage(image);
        let currentIsSelected = image.className.includes("illustrationImageSelected");
        if (currentAnimalPath == animalPath && currentIsSelected == false) {
            updatedAnimal = true;
            image.className += ' illustrationImageSelected';
        } else if (currentAnimalPath != animalPath && currentIsSelected) {
            image.className = image.className.replace(' illustrationImageSelected', '')
        }
    }
    let animalName = animalPath.split('-')[0];
    if (updatedAnimal && animalName.length > 0) {
        const mainImage = document.getElementsByClassName('illustrationMainImage')[0];
        mainImage.src = 'assets/illustrations-main/' + animalName + '.png';
    }
}
attachListeners();
