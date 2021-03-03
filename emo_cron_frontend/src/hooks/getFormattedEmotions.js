import ECApi from '../ECApi';


function getFormattedEmotions(num) {

    async function getEmotions(n) {
        const res = await ECApi.getEmotions(n)
        return res.emotions;
    }

    function formatEmotions(arr) {

        let formatted = arr.map(obj => ({
            value: obj.emotion,
            count: Math.floor(Math.random() * 20) + 20
        }));

        return formatted;
    }

    const emotions = getEmotions(num);
    const formattedEmotions = formatEmotions(emotions);

    return formattedEmotions;
}

export default getFormattedEmotions;