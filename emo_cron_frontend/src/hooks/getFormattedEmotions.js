import ECApi from '../ECApi';


async function getFormattedEmotions(num) {

    async function getEmotions(n) {
        const res = await ECApi.getEmotions(n)
        return res.emotions;
    }

    function formatEmotions(arr) {
        let formatted = arr.map((obj, idx) => ({
            id: idx,
            value: obj.emotion,
            count: Math.floor(Math.random() * 10) + 10,
            angle: Math.floor(Math.random() * 90) - 45,
            isSelected: false
        }));

        return formatted;
    }

    const emotions = await getEmotions(num);
    const formattedEmotions = formatEmotions(emotions);
    return formattedEmotions;
}

export default getFormattedEmotions;