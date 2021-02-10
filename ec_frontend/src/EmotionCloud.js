
//https://openbase.com/js/react-d3-cloud

import React, {useState, useEffect} from 'react';
// import { render } from 'react-dom';
import WordCloud from 'react-d3-cloud';
import { TagCloud } from 'react-tagcloud';
import formatCloudGroup from './helpers/formatCloudGroup';

//you need to make this reactive for choices and add it to an array that
//will need to be fed back to the form
//can you make a bigger one to work as a background?
//need a useEffect to get emotion to make the cloud

// const emoArr = ['afraid','agitated','alarmed','antsy','anxious','apprehensive','cautious','concerned','cowardly','distressed','dread','edgy','fearful','foreboding','frazzled','fretful','frightened','guarded','hesitant','horrified','hysterical','jumpy','nervous','panic','paralyzed','paranoid','petrified','restless','scared','shaken','skeptical','startled','stressed','tense','terrified','timid','trepidation','twitchy','uptight','vigilant','wary','worried','angry','aggravated','animosity','annoyed','antagonistic','antipathy','bitter','bothered','burning','choleric','cold','consternation','contempt','cross','disgruntled','enmity','exasperated','frustrated','furious','grouchy','harassed','hostile','ill-tempered','impatient','indignant','irritated','irate','irascible','mad','miffed','moody','nasty','offended','outraged','peevish','perturbed','pissed','resentful','petulant','rage','rattled','resentment','sour','testy','tetchy','vexed','vindictive','wrathful','courageous','adventurous','audacious','bold','brave','capable','certain','cocky','confident','comfortable','daring','determined','fearless','free','grounded','gutsy','powerful','proud','resolute','strong','superior','tenacious','tough','valiant','vehement','worthy','disconnected','adrift','alienated','alone','aloof','bored','conflicted','consternated','cranky','denial','detached','disillusioned','disinterested','distant','distracted','empty','groggy','hollow','jaded','indifferent','isolated','lethargic','listless','lost','neutral','numb','powerless','preoccupied','puzzled','reluctance','removed','resignation','resistant','sheepish','shut','down','sluggish','sullen','torn','uneasy','withdrawn','dislike','abhorrence','aversion','detest','disdain','disgust','envious','grudging','hate','repugnance','revolted','scorn','embarrassed','appalled','apologetic','ashamed','chagrined','compunction','contrite','flustered','foolish','guilty','humbled','humored','inferior','inhibited','mortified','pathetic','regretful','repentant','shame','self-conscious','sorry','submissive','useless','weak','worthless','energized','alert','alive','animated','aroused','bouncy','curious','fanatical','fascinated','feisty','fervor','gung-ho','gusto','hyper','intense','psyched','pumped','snappy','sprightly','thirst','titillated','vindicated','zeal','zest','grateful','blessed','fortunate','gratified','relish','savor','thankful','touched','helpless','awkward','baffled','challenged','clueless','complacent','disturbed','exhausted','fatigued','fragile','impotent','incapable','needy','overwhelmed','pathetic','perplexed','powerless','resigned','sensitive','trapped','victim','hopeful','anticipation','craving','desiring','eager','encouraged','expectant','hankering','optimistic','trusting','hurt','agony','betrayed','humiliated','pained','stung','suffering','suffocated','tormented','tortured','traumatized','insecure','bashful','befuddled','bewildered','cynical','confused','doubtful','possessive','shy','woozy','introspective','absorbed','brooding','contemplative','engrossed','enlightened','inspired','interested','meditative','nostalgic','pensive','reflective','solemn','stirred','wonder','joyful','amused','awed','bemused','bliss','blithe','bonhomie','bubbly','buoyant','carefree','cheerful','delectation','delighted','delirious','ebullient','ecstatic','elated','enchanted','enjoyment','entertained','enthusiastic','euphoric','excited','exhilarated','exuberant','felicitous','genial','giddy','glad','gleeful','goofy','happy','humorous','invigorated','jocular','jocund','jolly','jovial','jubilant','liberated','lighthearted','lively','lucky','merry','mirthful','mischievous','motivated','passionate','perky','playful','pleasure','positive','proud','rapture','reassured','relieved','sanguine','satisfied','silly','sunny','thrilled','triumphant','upbeat','vibrant','kind','caring','compassionate','cordial','earnest','empathetic','pitying','self-loving','sincere','sympathetic','succor','tender','thoughtful','vulnerable','warm','welcoming','loving','accepting','admiring','adoring','adulation','affectionate','ardor','attached','attracted','captivated','devoted','enthralled','felicitous','fondness','fulfilled','infatuated','intimate','intoxicated','present','protective','safe','sensual','warm','worthy','peaceful','accepting','calm','centered','collected','comforted','composed','content','ease','free','fulfilled','mellow','mollified','open','pacified','patient','phlegmatic','present','receptive','relaxed','secure','settled','sure','trusting','tranquil','sadness','aching','alienated','angst','anguish','blue','choked','crestfallen','crummy','crushed','defeated','dejected','depressed','despair','despondent','devastated','disappointed','discouraged','dismal','doleful','down','downcast','excluded','forlorn','gloomy','grief','heartbroken','homesick','hopeless','hurt','lonely','longing','melancholy','mournful','pained','pessimistic','remorseful','sick','somber','sorrowful','teary','troubled','unhappy','upset','weary','wistful','woe','wretched','yearning','surprised','amazed','astonished','astounded','breathless','disbelief','dubious','dumbfounded','flabbergasted','floored','quizzical','scandalized','serendipitous','shock','speechless','stunned','stupefied','unkind','crafty','cruel','derisive','greedy','petty','selfish','smug'];
// function randomEmotions (arr, num = 20) {
//     const randomEmos = [];
//     for(let i = 0; i < num;) {
//         const random = Math.floor(Math.random() * arr.length);
//         if (randomEmos.indexOf(arr[random]) !== -1){
//             continue;
//         }
//         randomEmos.push(arr[random]);
//         i++;
//     };
//     return randomEmos;
// };

// const emotions = randomEmotions(emoArr)
// console.log('emotions array', emotions)

// const emoData = emotions.map(emo => {
//     const value = Math.floor(Math.random() * 1000) + 100;
//     return { text: emo, value: value};
// });

// console.log('all the data', emoData);

// const fontsizeMapper = word => Math.log2(word.value) * 5;
// const rotate = word => word.value % 360;
// const screenWidth = window.width;
// const screenHeight = window.height;

function EmoCloud () {
    const emos = formatCloudGroup()

    // const emoData = emos.map(emo => {
    //     const value = Math.floor(Math.random() * 1000) + 100;
    //     return { text: emo, value: value};
    // });

    // useEffect(() =>{
    //     setEmos(formatCloudGroup())
    //     console.log(emos)
    // }, [])

    const fontsizeMapper = word => Math.log2(word.value) * 5;
    const rotate = word => word.value % 45;
    let screenWidth = Math.floor(window.innerWidth * 0.8);
    let screenHeight = Math.floor(window.innerHeight * 0.8);

    return (
        <div>
            <p>{JSON.stringify(emos)}</p>
            <p>{emos.length}</p>
            <p>{screenHeight}</p>
            <p>{screenWidth}</p>

            {/* {emoData.map(emo => (
                <p>{JSON.stringify(emo)}</p>
            ))} */}
            
            {/* <WordCloud data={emos} fontsizeMapper={fontsizeMapper} width={screenWidth} height={screenHeight} /> */}
            <WordCloud data={emos} width={screenWidth} height={screenHeight} />
            {/* <TagCloud tags={emos} maxSize={75} minSize={50}/> */}
        
        </div>
        )

}

export default EmoCloud;


