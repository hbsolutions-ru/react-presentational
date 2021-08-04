
export const getRandomId = () => Math.random().toString(36).substring(2, 10);

export const removeArrayValue = (array, value) => {
    const index = array.indexOf(value);
    if (index !== -1) {
        array.splice(index, 1);
    }
};
