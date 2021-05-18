
export const getRandomId = () => Math.random().toString(36).substr(2, 8);

export const removeArrayValue = (array, value) => {
    const index = array.indexOf(value);
    if (index !== -1) {
        array.splice(index, 1);
    }
};
