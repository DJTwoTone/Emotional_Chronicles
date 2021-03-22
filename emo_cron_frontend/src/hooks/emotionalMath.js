const emotionObj = {
    'joy': ['serenity', 'joy', 'ecstasy'],
    'sadness': ['pensiveness', 'sadness', 'grief'],
    'fear': ['apprehension', 'fear', 'terror'],
    'surprise': ['distraction', 'surprise', 'amazement'],
    'anger': ['distraction', 'surprise', 'amazement'],
    'anticipation': ['interest', 'anticipation', 'vigilance'],
    'disgust': ['boredom', 'disgust', 'loathing'],
    'trust': ['acceptance', 'trust', 'admiration'],
    'no_emotion': ['emotionlessness']
} 



export default function emotionMath(emoData) {
    
    let mathedEmotions = [];


    // let { joy, sadness, fear, anger, anticipation, disgust, trust, no_emotion } = emoData;

    Object.keys(emotionObj).forEach(val => {
        if (val === 'no_emotion' && emoData[val] >= 0.65) {
            mathedEmotions.push(emotionObj[val][0])
        } else {
            if (emoData[val] > 0.5 && emoData[val] <= .65) {
                mathedEmotions.push(emotionObj[val][0])
            }
            if (emoData[val] > 0.65 && emoData[val] <= .8) {
                mathedEmotions.push(emotionObj[val][1])
            }
            if (emoData[val] > 0.8) {
                mathedEmotions.push(emotionObj[val][2])
            }

        }
        
    })

    if (mathedEmotions.includes('joy')) {
        if(mathedEmotions.includes('anticipation')) {
            mathedEmotions.push('optimism')
            mathedEmotions.push('courage')
        }
        if(mathedEmotions.includes('trust')) {
            mathedEmotions.push('love')
            mathedEmotions.push('friendliness')
        }
        if(mathedEmotions.includes('fear')) {
            mathedEmotions.push('guilt')
            mathedEmotions.push('excitement')
        }
        if(mathedEmotions.includes('surprise')) {
            mathedEmotions.push('delight')
            mathedEmotions.push('doom')
        }
        if(mathedEmotions.includes('disgust')) {
            mathedEmotions.push('morbidness')
            mathedEmotions.push('derisiveness')
        }
        if(mathedEmotions.includes('anger')) {
            mathedEmotions.push('pride')
            mathedEmotions.push('victory')
        }
        if(mathedEmotions.includes('sadness')) {
            mathedEmotions.push('bittersweetness')
        }
    }

    if (mathedEmotions.includes('anticipation')) {
        if(mathedEmotions.includes('trust')) {
            mathedEmotions.push('hope')
            mathedEmotions.push('fatalism')
        }
        if(mathedEmotions.includes('fear')) {
            mathedEmotions.push('anxiety')
            mathedEmotions.push('dread')
        }
        if(mathedEmotions.includes('sadness')) {
            mathedEmotions.push('pessimism')
        }
        if(mathedEmotions.includes('disgust')) {
            mathedEmotions.push('cynicism')
        }
        if(mathedEmotions.includes('anger')) {
            mathedEmotions.push('agressiveness')
            mathedEmotions.push('vengeance')
        }
        if(mathedEmotions.includes('surprise')) {
            mathedEmotions.push('confusion')
        }
    }

    if (mathedEmotions.includes('surprise')) {
        if(mathedEmotions.includes('sadness')) {
            mathedEmotions.push('disapproval')
            mathedEmotions.push('disappointment')
        }
        if(mathedEmotions.includes('disgust')) {
            mathedEmotions.push('unbelief')
            mathedEmotions.push('shock')
        }
        if(mathedEmotions.includes('anger')) {
            mathedEmotions.push('outrage')
            mathedEmotions.push('hate')
        }
        if(mathedEmotions.includes('trust')) {
            mathedEmotions.push('curiosity')
        }
        if(mathedEmotions.includes('fear')) {
            mathedEmotions.push('awe')
            mathedEmotions.push('alarm')
        }
    }

    if (mathedEmotions.includes('sadness')) {
        if(mathedEmotions.includes('disgust')) {
            mathedEmotions.push('remorse')
            mathedEmotions.push('misery')
        }
        if(mathedEmotions.includes('anger')) {
            mathedEmotions.push('envy')
            mathedEmotions.push('sullenness')
        }
        if(mathedEmotions.includes('trust')) {
            mathedEmotions.push('sentimentality')
            mathedEmotions.push('resignation')
        }
        if(mathedEmotions.includes('fear')) {
            mathedEmotions.push('despair')
        }

    }

    if (mathedEmotions.includes('trust')) {
        if(mathedEmotions.includes('fear')) {
            mathedEmotions.push('submission')
            mathedEmotions.push('modesty')
        }
        if(mathedEmotions.includes('anger')) {
            mathedEmotions.push('dominance')
        }
        if(mathedEmotions.includes('disgust')) {
            mathedEmotions.push('ambivalence')
        }

    }

    if (mathedEmotions.includes('disgust')) {
        if(mathedEmotions.includes('anger')) {
            mathedEmotions.push('contempt')
            mathedEmotions.push('scorn')
        }
        if(mathedEmotions.includes('fear')) {
            mathedEmotions.push('shame')
            mathedEmotions.push('prudishness')
        }
    }

    if (mathedEmotions.includes('fear') && mathedEmotions.includes('anger')) {
        mathedEmotions.push('frozenness')
    }



    return mathedEmotions
    

}


/**
 * serenity
 * joy
 * ecstasy
 * 
 * 
 * 
 * pensiveness
 * sadness
 * grief
 * 
 * apprehension
 * fear
 * terror
 * 
 * distraction
 * surprise
 * amazement
 * 
 * annoyance
 * anger
 * rage
 * 
 * interest
 * anticipation
 * vigilance
 * 
 * boredom
 * disgust
 * loathing
 * 
 * acceptance
 * trust
 * admiration
 * 
 * no_emotion
 * 
 * 
// Optimism, Courage	Anticipation + Joy	
// Disapproval, Disappointment	Surprise + Sadness
// Hope, Fatalism	Anticipation + Trust	
// Unbelief, Shock	Surprise + Disgust
// Anxiety, Dread	Anticipation + Fear	
// Outrage, Hate	Surprise + Anger
// Love, Friendliness	Joy + Trust	
// Remorse, Misery	Sadness + Disgust
// Guilt, Excitement	Joy + Fear	
// Envy, Sullenness	Sadness + Anger
// Delight, Doom	Joy + Surprise	
// Pessimism	Sadness + Anticipation
// Submission, Modesty	Trust + Fear	
// Contempt, Scorn	Disgust + Anger
// Curiosity	Trust + Surprise	
// Cynicism	Disgust + Anticipation
// Sentimentality, Resignation	Trust + Sadness	
// Morbidness, Derisiveness	Disgust + Joy
// Awe, Alarm	Fear + Surprise	
// Aggressiveness, Vengeance	Anger + Anticipation
// Despair	Fear + Sadness	
// Pride, Victory	Anger + Joy
// Shame, Prudishness	Fear + Disgust	
// Dominance	Anger + Trust

// Bittersweetness	Joy + Sadness
// Ambivalence	Trust + Disgust
Frozenness	Fear + Anger
// Confusion	Surprise + Anticipation

 */