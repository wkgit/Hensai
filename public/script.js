var state = "getNamePhase";
var name;
var price;
var date;

$(document).ready(function(){
    if (state == "getNamePhase") {
        appendBotMessage("こんにちは。はじめに、あなたの名前を教えてね。");
    }
});

const onKeyDown = () => {
    // Enterキー押下時
    if (event.keyCode == 13) {
        submit()
    }
}

const submit = (e) => {
    const str = $('.textarea').val();
    if (str === '') return;
    appendSelfMessage(str);
    if (state == "finishInit") {
        if (str.indexOf("ギャンブル") !== -1) {
            appendBotMessage("そのお金を返済にあてましょう");
        }
        else if (str.indexOf("競馬") !== -1) {
            appendBotMessage("そのお金を返済にあてましょう");
        }
        else if (str.indexOf("競艇") !== -1) {
            appendBotMessage("そのお金を返済にあてましょう");
        }
        else if (str.indexOf("パチンコ") !== -1) {
            appendBotMessage("そのお金を返済にあてましょう");
        }
        else if (str.indexOf("スロット") !== -1) {
            appendBotMessage("そのお金を返済にあてましょう");
        }
        else if (str.indexOf("死ね") !== -1) {
            appendBotMessage("そんなこと言わないで下さい");
        }
        else if (str.indexOf("死ぬ") !== -1) {
            appendBotMessage("そんなこと言わないで下さい");
        }
        else if (str.indexOf("氏ね") !== -1) {
            appendBotMessage("そんなこと言わないで下さい");
        }
        else if (str.indexOf("タヒね") !== -1) {
            appendBotMessage("そんなこと言わないで下さい");
        }
        else if (str.indexOf("つらい") !== -1) {
            appendBotMessage("そこをなんとか");
        }
        else if (str.indexOf("まけて") !== -1) {
            appendBotMessage("そこをなんとか");
        }
        else if (str.indexOf("辛い") !== -1) {
            appendBotMessage("そこをなんとか");
        }
        else if (str.indexOf("むり") !== -1) {
            appendBotMessage("そこをなんとか");
        }
        else if (str.indexOf("無理") !== -1) {
            appendBotMessage("そこをなんとか");
        } else {
            fetchBotReply(str, function(reply) {
                appendBotMessage(reply);
            });
        }
    }

    if (state=="getNamePhase") {
        name = str;
        appendBotMessage(str + "さんですね。");
        appendBotMessage("次に借りた額を教えてください。");
        state = "getPricePhase"
    } else if (state=="getPricePhase") {
        price = str;
        appendBotMessage(str + "も借りてるんですか!?");
        appendBotMessage("では、何年何月何日までに返す予定ですか？");
        state = "getDatePhase"
    } else if (state=="getDatePhase") {
        date = str;
        appendBotMessage(str + "ですね。それまでに頑張って返しましょう！");
        state = "finishInit";
    }
    $('.textarea').val('');
}

const pushNotification = (cmd) => {
    const mockName = name || "借金太郎";
    const mockAmount = price || "200万円" ;
    const mockLimitDay = date || "2017年6月28日";
    var lines = [];
    lines.push("おはようございます。");
    lines.push(mockName+"さんの借金返済日は、"+mockLimitDay+"です。");
    lines.push("返済額は、残り"+mockAmount+"です。");
    switch (cmd) {
        case 'dby':
            lines.push("あさってが返済日ですけど、まだ2日もあるから大丈夫！");
            break;
        case 'y':
            lines.push("明日が返済日です。お金の準備は大丈夫ですか？");
            break;
        case 't':
            lines.push("今日が返済日当日です。ようやく借金返済の日々から抜けられますね！");
            break;
        default:
            lines.push("今日もお仕事頑張りましょう！");
            break;
    }
    for(let i = 0; i < lines.length; i++) {
        appendBotMessage(lines[i]);
    }
    return 'success'
}


const appendSelfMessage = (str) => {
    const time = makeTimeStr();
    const message = '<li class="self"><div class="avatar"><img src="https://i.imgur.com/DY6gND0.png" draggable="false"/></div><div class="msg"><p>'+str+'</p><time>'+time+'</time></div></li>'
    $(".chat").append(message);
}

const appendBotMessage = (str) => {
    const time = makeTimeStr();
    const message = '<li class="other"><div class="avatar"><img src="./kima_03.png" draggable="false"/></div><div class="msg"><p>'+str+'</p><time>'+time+'</time></div></li>'
    $(".chat").append(message);
}

const makeTimeStr = () => {
    const today = new Date();
    let result = "";
    result += today.getHours() + ":";
    result += today.getMinutes();
    return result;
}

const fetchBotReply = (str, callback) => {
    callApi(str ,callback);
}

const callApi = (query, callback) => {
    $.ajax({
        type: "POST",
        url: "https://api.a3rt.recruit-tech.co.jp/talk/v1/smalltalk",
        data: {
            "apikey": "SeN4GaLXYy9jCrJksJYQsSquKVgmWiBO",
            "query" : query
        }
        , success(data) {
            callback(data.results[0].reply);
        }
    });
}

