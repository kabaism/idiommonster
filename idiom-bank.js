const RAW_IDIOM_BANK = {
  basic: [
    { idiom: "亡羊補牢", meaning: "出了問題後立刻補救，仍然來得及", hint: "重點是補救，不是放棄", wrongMeanings: ["做事慢吞吞，一直拖到最後", "一直責怪別人，自己不願處理", "遇到困難就乾脆全部重來"], funnyMeaning: "羊跑掉後先開失物招領大會，再順手把柵欄補好" },
    { idiom: "畫蛇添足", meaning: "做了多餘的事，反而把事情弄壞", hint: "多做未必更好", wrongMeanings: ["先把事情做好，再慢慢補細節", "模仿別人的做法，結果完全一樣", "把麻煩的步驟全部交給別人"], funnyMeaning: "原本只要畫蛇，結果硬幫牠加球鞋和書包" },
    { idiom: "井底之蛙", meaning: "見識狹窄，眼界有限", hint: "形容看得不夠遠", wrongMeanings: ["待在危險地方，進退都很困難", "懂得很多，能從不同角度思考", "遇到陌生環境，暫時不敢前進"], funnyMeaning: "青蛙靠著井口那一圈天空就宣布自己是宇宙專家" },
    { idiom: "守株待兔", meaning: "不主動努力，只想靠運氣成功", hint: "等機會不如創造機會", wrongMeanings: ["小心觀察周圍，再決定怎麼行動", "練習很多次，最後終於熟練", "找到方向後，立刻加快速度"], funnyMeaning: "每天抱著樹幹打卡，期待兔子自己送上門" },
    { idiom: "掩耳盜鈴", meaning: "自欺欺人，以為別人不會發現", hint: "遮住自己耳朵不是辦法", wrongMeanings: ["悄悄把問題藏起來，不讓自己想起", "聽到提醒後立刻提高警覺", "擔心太多，什麼事都不敢做"], funnyMeaning: "一邊偷鈴鐺一邊大喊我現在完全聽不見喔" },
    { idiom: "雪中送炭", meaning: "在他人最需要時及時幫助", hint: "最困難時伸出援手", wrongMeanings: ["平常不理人，等成功了才靠近", "事情結束後再來補一句安慰", "先照顧自己，別人的事先放旁邊"], funnyMeaning: "朋友冷到發抖時，你端來的不是冰沙而是暖呼呼火爐" },
    { idiom: "對牛彈琴", meaning: "對不懂道理的人說深奧內容", hint: "對象不對，話就白說", wrongMeanings: ["反覆練習後，終於打動觀眾", "雖然聽不懂，還是很願意學習", "找到簡單方法，把難題一次解開"], funnyMeaning: "牛只想吃草，你卻認真開古典音樂講座" },
    { idiom: "狐假虎威", meaning: "借別人的威勢來嚇唬人", hint: "不是自己的力量", wrongMeanings: ["自己很有本事，所以大家信服", "遇到困難時故意裝作沒事", "和大家合作，因此更有安全感"], funnyMeaning: "狐狸躲在老虎後面，還搶先宣布今天由我來管秩序" },
    { idiom: "一箭雙鵰", meaning: "一次行動同時達成兩個目標", hint: "一舉兩得的概念", wrongMeanings: ["先完成一件，再慢慢處理另一件", "事情太難，只好放棄其中一半", "為了保險，所以同樣的事做兩次"], funnyMeaning: "一支箭飛出去，順便把作業和點心都帶回來" },
    { idiom: "入木三分", meaning: "形容見解或筆力深刻有力", hint: "程度非常深", wrongMeanings: ["寫字工整漂亮，但內容普通", "只看到事情表面，沒有深入思考", "說話很快，讓人來不及反應"], funnyMeaning: "寫字太用力，差點把桌子刻成新的課本封面" },
    { idiom: "滄海一粟", meaning: "在廣大事物中顯得非常渺小", hint: "以大襯小", wrongMeanings: ["把很多小事慢慢累積成大成果", "從混亂中找出最重要的一點", "雖然力量小，但大家一起就很強"], funnyMeaning: "站在大海邊捧著一粒米，突然感覺自己像迷你版宇航員" },
    { idiom: "胸有成竹", meaning: "做事前已有完整把握", hint: "心中已有明確計畫", wrongMeanings: ["想到哪裡做到哪裡，邊走邊看", "事情很難，所以一直不敢開始", "靠別人提醒，自己沒有準備"], funnyMeaning: "還沒上台就先在腦中演練到連掌聲次數都算好了" },
    { idiom: "自相矛盾", meaning: "說法或行為前後互相衝突", hint: "自己打臉自己", wrongMeanings: ["和別人意見不同，但各有道理", "堅持原則，所以不願退讓", "一時口誤，馬上改正過來"], funnyMeaning: "前一秒說絕不吃甜點，下一秒已經拿著第二塊蛋糕" },
    { idiom: "刻舟求劍", meaning: "拘泥舊方法，不知變通", hint: "情況變了，方法也要變", wrongMeanings: ["先把工具準備好再出發", "照著前輩經驗，小心避開危險", "一步一步修正，所以結果更穩"], funnyMeaning: "劍掉進水裡後，你忙著在船上畫記號，完全忘了船會繼續漂" },
    { idiom: "杯弓蛇影", meaning: "因疑神疑鬼而自我驚嚇", hint: "把影子當成可怕東西", wrongMeanings: ["看到危險訊號後立刻避開", "被提醒一次就牢牢記住", "心情很亂，所以什麼都做不好"], funnyMeaning: "只是看到杯子裡倒影，就差點把自己嚇到請假" },
    { idiom: "揠苗助長", meaning: "急於求成，反而壞事", hint: "拔苗不會長更快", wrongMeanings: ["耐心等待，事情自然成熟", "方法不熟，所以先停下來學習", "趁著機會好，一口氣衝到底"], funnyMeaning: "為了讓苗長高，結果直接把小苗提成空中盆栽" },
    { idiom: "愚公移山", meaning: "持續努力，終能克服困難", hint: "靠毅力完成大事", wrongMeanings: ["事情太大，所以乾脆不要開始", "找捷徑處理，省時又省力", "等別人幫忙，自己先休息一下"], funnyMeaning: "每天鏟一點土，最後連山都開始懷疑自己會不會搬家" },
    { idiom: "四面楚歌", meaning: "陷入四面受敵、孤立無援", hint: "到處都是壓力", wrongMeanings: ["大家同心協力，一起面對難關", "站在安全位置，慢慢觀察情勢", "找到朋友支持，所以不再害怕"], funnyMeaning: "一打開門，前後左右都像在播放壓力測驗主題曲" },
    { idiom: "畫龍點睛", meaning: "在關鍵處加上一筆，使整體更好", hint: "最後關鍵一筆", wrongMeanings: ["從頭到尾都很平均，沒有特別亮點", "先把輪廓畫完，細節以後再說", "故意留下空白，讓大家自己想像"], funnyMeaning: "龍都畫好了，只差最後那一眼就能申請起飛" },
    { idiom: "班門弄斧", meaning: "在行家面前賣弄本領", hint: "高手前逞強", wrongMeanings: ["向高手請教，所以進步很快", "雖然緊張，還是認真表現自己", "和同學互相比較，想找出差距"], funnyMeaning: "站在木工大師旁邊，突然很想展示自己的紙板小斧頭" },
    { idiom: "半途而廢", meaning: "事情做到一半就放棄", hint: "沒有堅持到最後", wrongMeanings: ["先休息一下，之後再繼續完成", "做得很慢，但最後還是成功", "目標太大，所以先拆成小步驟"], funnyMeaning: "跑到一半突然覺得終點太遠，乾脆坐下來研究點心菜單" },
    { idiom: "唇亡齒寒", meaning: "彼此關係密切，一方有難另一方受影響", hint: "互相依存的關係", wrongMeanings: ["表面合作，其實各做各的", "遇到危機時，自己保護自己就好", "因為感情不好，所以互不來往"], funnyMeaning: "嘴唇一放假，牙齒立刻發現今天的風怎麼特別冷" },
    { idiom: "盲人摸象", meaning: "只見局部，不知全貌", hint: "每人只摸到一小塊", wrongMeanings: ["從不同意見中找出共同答案", "大家分工合作，把事情做完", "只看重點，所以省下很多時間"], funnyMeaning: "有人摸到鼻子說是水管，有人摸到腿說是柱子，象都聽傻了" },
    { idiom: "破釜沉舟", meaning: "下定決心，不留退路", hint: "背水一戰的決心", wrongMeanings: ["先安排退路，事情才做得穩", "遇到危險就暫時撤退", "把責任分出去，減少自己的壓力"], funnyMeaning: "鍋子和船都先處理掉，今天真的只能往前衝了" },
    { idiom: "望梅止渴", meaning: "用空想安慰自己，暫時紓解需求", hint: "想到梅子就覺得不渴", wrongMeanings: ["立刻找到真正解決問題的方法", "先忍耐一下，之後就會習慣", "靠朋友幫忙，所以壓力變小"], funnyMeaning: "水壺忘帶，只好盯著梅子圖片假裝嘴巴已經有口水加成" },
    { idiom: "草木皆兵", meaning: "過度緊張，把一切都當威脅", hint: "緊張到看什麼都像敵人", wrongMeanings: ["非常仔細，所以不放過任何細節", "準備周全，因此一路順利", "遇到事情先冷靜，再慢慢判斷"], funnyMeaning: "連操場上的掃把都被你懷疑是不是偷偷埋伏的士兵" },
    { idiom: "驚弓之鳥", meaning: "受過驚嚇後變得特別敏感害怕", hint: "一點風吹草動就怕", wrongMeanings: ["看到熟悉場面就特別安心", "因為經驗多，所以變得很勇敢", "雖然失敗過，但立刻重新出發"], funnyMeaning: "只聽到橡皮筋彈一下，就以為天空又要掉下危機通知" },
    { idiom: "因小失大", meaning: "為了小利益而失去更大的利益", hint: "撿芝麻丟西瓜", wrongMeanings: ["先顧大局，再處理小問題", "每一件小事都做得很仔細", "用少量資源換到更大成果"], funnyMeaning: "為了省下一顆糖，結果把整盒點心忘在公車上" },
    { idiom: "如魚得水", meaning: "處於合適環境，感到自在順利", hint: "非常對味、很上手", wrongMeanings: ["剛換新地方，所以還不習慣", "情況太亂，暫時找不到方向", "事情簡單，因此誰做都一樣"], funnyMeaning: "魚一跳進水裡，連尾巴都像在說終於輪到我主場了" },
    { idiom: "錦上添花", meaning: "在原本就好的事物上再加美化", hint: "好上加好", wrongMeanings: ["事情不好，所以只好重新開始", "先把缺點補起來，再談優點", "把普通東西說得非常厲害"], funnyMeaning: "蛋糕已經很漂亮了，你又幫它戴上會發光的小皇冠" },
    { idiom: "落井下石", meaning: "趁人困難時再加打擊", hint: "別人在谷底還去踩一腳", wrongMeanings: ["看到別人跌倒，立刻伸手幫忙", "先保持距離，避免被牽連", "等風波過後，再慢慢處理問題"], funnyMeaning: "人家已經在井裡喊救命，你還順手丟下一本作業簿" },
    { idiom: "一心一意", meaning: "專注一致，沒有分心", hint: "心思集中不分散", wrongMeanings: ["同時處理很多事，效率還不錯", "情緒不穩，所以很難決定", "想法很多，需要大家一起討論"], funnyMeaning: "今天的腦袋只開一個視窗，其他分頁全部自動關閉" },
    { idiom: "三心二意", meaning: "心意不定，容易動搖", hint: "一下想這個，一下想那個", wrongMeanings: ["目標明確，所以一路往前走", "遇到困難時更能堅持原則", "每件事都安排得井井有條"], funnyMeaning: "作業做到一半又想畫畫，畫到一半又想去找點心" },
    { idiom: "專心致志", meaning: "全神貫注在一件事上", hint: "非常專注", wrongMeanings: ["速度很快，所以常常出錯", "事情很多，只能輪流處理", "人很多時，更容易被分散注意"], funnyMeaning: "連隔壁在跳舞都沒發現，因為你的注意力已經鎖定目標" },
    { idiom: "井然有序", meaning: "有條理、秩序分明", hint: "整整齊齊、有規律", wrongMeanings: ["東西很多，所以看起來熱鬧", "雖然混亂，但最後還是完成", "大家想法不同，所以很有創意"], funnyMeaning: "連鉛筆和橡皮擦都像排隊領號碼牌一樣整齊" },
    { idiom: "手忙腳亂", meaning: "慌亂得不知所措", hint: "忙到亂成一團", wrongMeanings: ["工作很多，但還是安排得很好", "步驟繁複，所以先慢慢檢查", "遇到突發狀況，依然冷靜處理"], funnyMeaning: "明明只是在找尺，最後連書包都快被你翻成龍捲風" },
    { idiom: "循規蹈矩", meaning: "遵守規則，不逾越本分", hint: "照規矩做事", wrongMeanings: ["想法很多，常常打破舊習慣", "看場合決定，要不要守原則", "故意走捷徑，求快不求穩"], funnyMeaning: "連排隊去裝水都像在參加最守秩序模範生比賽" },
    { idiom: "舉一反三", meaning: "由一件事推知其他類似道理", hint: "會靈活延伸", wrongMeanings: ["只記住老師剛講的那一句", "看過一次，但還是不太懂", "事情太複雜，所以先不要碰"], funnyMeaning: "老師只示範一道題，你已經開始幫隔壁三課做延伸整理" },
    { idiom: "一知半解", meaning: "只懂一部分，理解不完整", hint: "懂得不夠透徹", wrongMeanings: ["全部想通了，還能教別人", "雖然不會，但願意從頭學起", "知道方法後，做起來非常熟練"], funnyMeaning: "聽懂前半句就急著點頭，後半句已經偷偷飄走了" },
    { idiom: "力不從心", meaning: "想做卻能力不足", hint: "有心無力", wrongMeanings: ["明明很累，還是硬撐到底", "條件很好，所以做起來很輕鬆", "擔心失敗，因此根本不想做"], funnyMeaning: "心裡想當超人，手腳卻先表示今天電量不足" },
    { idiom: "同心協力", meaning: "大家齊心合作完成目標", hint: "一起出力", wrongMeanings: ["每個人只顧自己那一部分", "先比輸贏，再決定要不要幫忙", "領頭的人很強，所以別人不用動"], funnyMeaning: "全班一起推任務進度條，連空氣都變得很有團隊感" },
    { idiom: "實事求是", meaning: "依據事實，不誇大不曲解", hint: "講求真實", wrongMeanings: ["故事要精彩，細節可以先放旁邊", "先相信直覺，再慢慢找證據", "說得越大聲，大家越容易相信"], funnyMeaning: "別急著加戲，先把真正發生的事請上台發言" },
    { idiom: "名列前茅", meaning: "成績或表現名列前面", hint: "排在前段班", wrongMeanings: ["雖然努力，但還在追趕中", "只要及格就好，不在乎名次", "表現普通，沒有特別突出"], funnyMeaning: "排行榜一打開，你的名字已經先在前面跟大家打招呼" },
    { idiom: "精益求精", meaning: "已經很好仍追求更好", hint: "好還要更好", wrongMeanings: ["做到差不多就先停下來", "只求速度，不太在意品質", "覺得很難，所以不敢再修改"], funnyMeaning: "作品已經很厲害，你還想幫它加上冠軍級閃光特效" },
    { idiom: "夜以繼日", meaning: "日夜不停地努力", hint: "白天晚上都在做", wrongMeanings: ["白天安排滿，晚上一定休息", "工作分散進行，所以不急著完成", "偶爾做一下，想到再繼續"], funnyMeaning: "太陽下班了，你的努力卻直接接手值夜班" },
    { idiom: "持之以恆", meaning: "長期堅持不懈", hint: "一直做下去不放棄", wrongMeanings: ["一開始很熱，後來慢慢淡掉", "想到才做，所以進度忽快忽慢", "每次都換新方法，難以累積"], funnyMeaning: "不是衝刺三分鐘，而是每天都默默把進度推前一格" },
    { idiom: "得意忘形", meaning: "太得意而失去分寸", hint: "高興過頭就失態", wrongMeanings: ["心情很好，但還是很穩重", "因為成功，所以更願意幫助別人", "太緊張了，反而不敢表現自己"], funnyMeaning: "才剛被稱讚一句，就差點把走廊當成自己的演唱會舞台" },
    { idiom: "乘風破浪", meaning: "不畏困難，勇往直前", hint: "迎著挑戰前進", wrongMeanings: ["遇到風浪時先躲起來等待", "小心觀望，不急著採取行動", "因為風很大，所以放棄原來計畫"], funnyMeaning: "海浪越高越像在幫你開歡迎模式，船頭直接熱血起來" },
    { idiom: "風雨同舟", meaning: "共同面對困難，互相扶持", hint: "一起扛過風雨", wrongMeanings: ["平時很好，遇到困難就各自散開", "只有領頭的人辛苦，其他人旁觀", "事情太危險，所以先保護自己"], funnyMeaning: "雨下再大也不拆隊，整艘船都在說我們一起划回去" },
    { idiom: "前功盡棄", meaning: "先前努力因中斷而白費", hint: "差一步卻全部歸零", wrongMeanings: ["前面基礎打好，後面越來越順", "雖然慢一點，但成果還保得住", "失敗一次後，反而得到更多經驗"], funnyMeaning: "城堡都快蓋好了，結果最後一腳把整片沙灘變回原廠設定" }
  ],
  advanced: [
    { idiom: "杞人憂天", meaning: "為不必要的事過度擔心", hint: "擔心不會發生的事", wrongMeanings: ["先把事情拖著，之後再看看", "遇到變化就立刻放棄原本安排", "只照表面判斷，不去追究原因"], funnyMeaning: "把「杞人憂天」寫成公告貼滿教室，結果大家先笑再點頭" },
    { idiom: "青出於藍", meaning: "學生或後輩超越老師前輩", hint: "後來者更優秀", wrongMeanings: ["等別人處理好，自己再跟上", "明知不對，還是照舊不想改", "事情還沒開始，就先想著收工"], funnyMeaning: "宣布今天的神祕口令就是「青出於藍」，連鬧鐘都被要求背熟" },
    { idiom: "按圖索驥", meaning: "依線索尋找事物，也可指拘泥成法", hint: "照圖找馬", wrongMeanings: ["看起來很忙，其實沒有抓到重點", "只顧眼前方便，不管後面影響", "把希望都放在運氣，不主動處理"], funnyMeaning: "拿著「按圖索驥」開臨時記者會，最後連鉛筆盒都成了來賓" },
    { idiom: "不恥下問", meaning: "不以向地位較低的人請教為恥", hint: "願意謙虛求教", wrongMeanings: ["先把氣氛做滿，內容之後再補", "臨時想到哪裡就做到哪裡", "只求速度，不在意結果是否穩當"], funnyMeaning: "先對著電風扇大聲朗讀「不恥下問」，彷彿空氣也要一起學會" },
    { idiom: "見賢思齊", meaning: "看見有德行的人就想向他看齊", hint: "向好榜樣學習", wrongMeanings: ["表面上很努力，其實沒有真正投入", "一遇到壓力就把原則丟到旁邊", "聽了一點意見，就以為全部都懂了"], funnyMeaning: "把「見賢思齊」塞進班級群組置頂，像是在替今天的任務打前鋒" },
    { idiom: "推己及人", meaning: "由自己的感受去體會別人", hint: "設身處地", wrongMeanings: ["先把事情拖著，之後再看看", "遇到變化就立刻放棄原本安排", "只照表面判斷，不去追究原因"], funnyMeaning: "讓掃地機器人巡迴播放「推己及人」，整個地板都像在上國文課" },
    { idiom: "飲水思源", meaning: "受惠時不忘本源與感恩", hint: "記得從哪裡來", wrongMeanings: ["等別人處理好，自己再跟上", "明知不對，還是照舊不想改", "事情還沒開始，就先想著收工"], funnyMeaning: "把「飲水思源」寫成公告貼滿教室，結果大家先笑再點頭" },
    { idiom: "循序漸進", meaning: "按照次序逐步前進", hint: "一步一步來", wrongMeanings: ["看起來很忙，其實沒有抓到重點", "只顧眼前方便，不管後面影響", "把希望都放在運氣，不主動處理"], funnyMeaning: "宣布今天的神祕口令就是「循序漸進」，連鬧鐘都被要求背熟" },
    { idiom: "一針見血", meaning: "說話切中要害", hint: "直接點到重點", wrongMeanings: ["先把氣氛做滿，內容之後再補", "臨時想到哪裡就做到哪裡", "只求速度，不在意結果是否穩當"], funnyMeaning: "拿著「一針見血」開臨時記者會，最後連鉛筆盒都成了來賓" },
    { idiom: "水落石出", meaning: "事情真相完全顯露", hint: "真相終於明白", wrongMeanings: ["表面上很努力，其實沒有真正投入", "一遇到壓力就把原則丟到旁邊", "聽了一點意見，就以為全部都懂了"], funnyMeaning: "先對著電風扇大聲朗讀「水落石出」，彷彿空氣也要一起學會" },
    { idiom: "舉一反三", meaning: "由一件事推知其他類似道理", hint: "會靈活延伸", wrongMeanings: ["先把事情拖著，之後再看看", "遇到變化就立刻放棄原本安排", "只照表面判斷，不去追究原因"], funnyMeaning: "把「舉一反三」塞進班級群組置頂，像是在替今天的任務打前鋒" },
    { idiom: "融會貫通", meaning: "把不同知識整合後通達理解", hint: "不是死背，而是會用", wrongMeanings: ["等別人處理好，自己再跟上", "明知不對，還是照舊不想改", "事情還沒開始，就先想著收工"], funnyMeaning: "讓掃地機器人巡迴播放「融會貫通」，整個地板都像在上國文課" },
    { idiom: "觸類旁通", meaning: "掌握一類事物後，能推及其他類型", hint: "理解會擴散到其他領域", wrongMeanings: ["看起來很忙，其實沒有抓到重點", "只顧眼前方便，不管後面影響", "把希望都放在運氣，不主動處理"], funnyMeaning: "把「觸類旁通」寫成公告貼滿教室，結果大家先笑再點頭" },
    { idiom: "旁徵博引", meaning: "說明時廣泛引用資料作證", hint: "舉很多例子來支持觀點", wrongMeanings: ["先把氣氛做滿，內容之後再補", "臨時想到哪裡就做到哪裡", "只求速度，不在意結果是否穩當"], funnyMeaning: "宣布今天的神祕口令就是「旁徵博引」，連鬧鐘都被要求背熟" },
    { idiom: "兼聽則明", meaning: "多方聽取意見才能判斷清楚", hint: "不要只聽單一聲音", wrongMeanings: ["表面上很努力，其實沒有真正投入", "一遇到壓力就把原則丟到旁邊", "聽了一點意見，就以為全部都懂了"], funnyMeaning: "拿著「兼聽則明」開臨時記者會，最後連鉛筆盒都成了來賓" },
    { idiom: "見微知著", meaning: "從細小跡象看出大方向", hint: "由小看大", wrongMeanings: ["先把事情拖著，之後再看看", "遇到變化就立刻放棄原本安排", "只照表面判斷，不去追究原因"], funnyMeaning: "先對著電風扇大聲朗讀「見微知著」，彷彿空氣也要一起學會" },
    { idiom: "防微杜漸", meaning: "在問題初期就預先防止擴大", hint: "小問題先處理", wrongMeanings: ["等別人處理好，自己再跟上", "明知不對，還是照舊不想改", "事情還沒開始，就先想著收工"], funnyMeaning: "把「防微杜漸」塞進班級群組置頂，像是在替今天的任務打前鋒" },
    { idiom: "未雨綢繆", meaning: "事情未發生前先做好準備", hint: "先準備，後安心", wrongMeanings: ["看起來很忙，其實沒有抓到重點", "只顧眼前方便，不管後面影響", "把希望都放在運氣，不主動處理"], funnyMeaning: "讓掃地機器人巡迴播放「未雨綢繆」，整個地板都像在上國文課" },
    { idiom: "居安思危", meaning: "平安時也不忘可能風險", hint: "順境也要有警覺", wrongMeanings: ["先把氣氛做滿，內容之後再補", "臨時想到哪裡就做到哪裡", "只求速度，不在意結果是否穩當"], funnyMeaning: "把「居安思危」寫成公告貼滿教室，結果大家先笑再點頭" },
    { idiom: "臨危不亂", meaning: "面對危急情況仍能鎮定", hint: "關鍵時刻不慌張", wrongMeanings: ["表面上很努力，其實沒有真正投入", "一遇到壓力就把原則丟到旁邊", "聽了一點意見，就以為全部都懂了"], funnyMeaning: "宣布今天的神祕口令就是「臨危不亂」，連鬧鐘都被要求背熟" },
    { idiom: "處變不驚", meaning: "遇到變故仍保持沉著", hint: "變化來了也穩住", wrongMeanings: ["先把事情拖著，之後再看看", "遇到變化就立刻放棄原本安排", "只照表面判斷，不去追究原因"], funnyMeaning: "拿著「處變不驚」開臨時記者會，最後連鉛筆盒都成了來賓" },
    { idiom: "當機立斷", meaning: "在關鍵時刻迅速做決定", hint: "該決定時不拖延", wrongMeanings: ["等別人處理好，自己再跟上", "明知不對，還是照舊不想改", "事情還沒開始，就先想著收工"], funnyMeaning: "先對著電風扇大聲朗讀「當機立斷」，彷彿空氣也要一起學會" },
    { idiom: "精打細算", meaning: "仔細規劃，節省資源", hint: "每一步都算清楚", wrongMeanings: ["看起來很忙，其實沒有抓到重點", "只顧眼前方便，不管後面影響", "把希望都放在運氣，不主動處理"], funnyMeaning: "把「精打細算」塞進班級群組置頂，像是在替今天的任務打前鋒" },
    { idiom: "因地制宜", meaning: "依照不同環境採取合適做法", hint: "看情況用對方法", wrongMeanings: ["先把氣氛做滿，內容之後再補", "臨時想到哪裡就做到哪裡", "只求速度，不在意結果是否穩當"], funnyMeaning: "讓掃地機器人巡迴播放「因地制宜」，整個地板都像在上國文課" },
    { idiom: "因材施教", meaning: "依學生差異給予不同教法", hint: "每個人教法不同", wrongMeanings: ["表面上很努力，其實沒有真正投入", "一遇到壓力就把原則丟到旁邊", "聽了一點意見，就以為全部都懂了"], funnyMeaning: "把「因材施教」寫成公告貼滿教室，結果大家先笑再點頭" },
    { idiom: "隨機應變", meaning: "依現場情況靈活調整", hint: "現場變化就跟著調整", wrongMeanings: ["先把事情拖著，之後再看看", "遇到變化就立刻放棄原本安排", "只照表面判斷，不去追究原因"], funnyMeaning: "宣布今天的神祕口令就是「隨機應變」，連鬧鐘都被要求背熟" },
    { idiom: "高瞻遠矚", meaning: "眼光長遠，能看到未來趨勢", hint: "不只看眼前", wrongMeanings: ["等別人處理好，自己再跟上", "明知不對，還是照舊不想改", "事情還沒開始，就先想著收工"], funnyMeaning: "拿著「高瞻遠矚」開臨時記者會，最後連鉛筆盒都成了來賓" },
    { idiom: "深思熟慮", meaning: "仔細思考後再行動", hint: "想清楚再做", wrongMeanings: ["看起來很忙，其實沒有抓到重點", "只顧眼前方便，不管後面影響", "把希望都放在運氣，不主動處理"], funnyMeaning: "先對著電風扇大聲朗讀「深思熟慮」，彷彿空氣也要一起學會" },
    { idiom: "集思廣益", meaning: "集合眾人意見使決策更好", hint: "一群人一起想更完整", wrongMeanings: ["先把氣氛做滿，內容之後再補", "臨時想到哪裡就做到哪裡", "只求速度，不在意結果是否穩當"], funnyMeaning: "把「集思廣益」塞進班級群組置頂，像是在替今天的任務打前鋒" },
    { idiom: "迎刃而解", meaning: "抓到關鍵後問題就容易解決", hint: "找到重點就好辦", wrongMeanings: ["表面上很努力，其實沒有真正投入", "一遇到壓力就把原則丟到旁邊", "聽了一點意見，就以為全部都懂了"], funnyMeaning: "讓掃地機器人巡迴播放「迎刃而解」，整個地板都像在上國文課" },
    { idiom: "言簡意賅", meaning: "語言簡短但意思完整", hint: "少字也能說重點", wrongMeanings: ["先把事情拖著，之後再看看", "遇到變化就立刻放棄原本安排", "只照表面判斷，不去追究原因"], funnyMeaning: "把「言簡意賅」寫成公告貼滿教室，結果大家先笑再點頭" },
    { idiom: "言之有物", meaning: "說話內容充實有價值", hint: "不是空話", wrongMeanings: ["等別人處理好，自己再跟上", "明知不對，還是照舊不想改", "事情還沒開始，就先想著收工"], funnyMeaning: "宣布今天的神祕口令就是「言之有物」，連鬧鐘都被要求背熟" },
    { idiom: "以身作則", meaning: "用自己的行為做榜樣", hint: "自己先做到", wrongMeanings: ["看起來很忙，其實沒有抓到重點", "只顧眼前方便，不管後面影響", "把希望都放在運氣，不主動處理"], funnyMeaning: "拿著「以身作則」開臨時記者會，最後連鉛筆盒都成了來賓" },
    { idiom: "鍥而不捨", meaning: "持續努力，不輕言放棄", hint: "持久的毅力", wrongMeanings: ["先把氣氛做滿，內容之後再補", "臨時想到哪裡就做到哪裡", "只求速度，不在意結果是否穩當"], funnyMeaning: "先對著電風扇大聲朗讀「鍥而不捨」，彷彿空氣也要一起學會" },
    { idiom: "學以致用", meaning: "把學到的知識實際運用", hint: "會學也要會用", wrongMeanings: ["表面上很努力，其實沒有真正投入", "一遇到壓力就把原則丟到旁邊", "聽了一點意見，就以為全部都懂了"], funnyMeaning: "把「學以致用」塞進班級群組置頂，像是在替今天的任務打前鋒" },
    { idiom: "溫故知新", meaning: "複習舊知識而得到新理解", hint: "回頭看會有新收穫", wrongMeanings: ["先把事情拖著，之後再看看", "遇到變化就立刻放棄原本安排", "只照表面判斷，不去追究原因"], funnyMeaning: "讓掃地機器人巡迴播放「溫故知新」，整個地板都像在上國文課" },
    { idiom: "舉重若輕", meaning: "把困難事處理得輕鬆穩定", hint: "大事做得很從容", wrongMeanings: ["等別人處理好，自己再跟上", "明知不對，還是照舊不想改", "事情還沒開始，就先想著收工"], funnyMeaning: "把「舉重若輕」寫成公告貼滿教室，結果大家先笑再點頭" },
    { idiom: "談笑風生", meaning: "談話生動有趣，氣氛活絡", hint: "聊天很有感染力", wrongMeanings: ["看起來很忙，其實沒有抓到重點", "只顧眼前方便，不管後面影響", "把希望都放在運氣，不主動處理"], funnyMeaning: "宣布今天的神祕口令就是「談笑風生」，連鬧鐘都被要求背熟" },
    { idiom: "有條不紊", meaning: "做事有次序，不慌不亂", hint: "條理非常清楚", wrongMeanings: ["先把氣氛做滿，內容之後再補", "臨時想到哪裡就做到哪裡", "只求速度，不在意結果是否穩當"], funnyMeaning: "拿著「有條不紊」開臨時記者會，最後連鉛筆盒都成了來賓" },
    { idiom: "博覽群書", meaning: "閱讀範圍廣，見識豐富", hint: "看很多不同的書", wrongMeanings: ["表面上很努力，其實沒有真正投入", "一遇到壓力就把原則丟到旁邊", "聽了一點意見，就以為全部都懂了"], funnyMeaning: "先對著電風扇大聲朗讀「博覽群書」，彷彿空氣也要一起學會" },
    { idiom: "見多識廣", meaning: "經歷多，知識面廣", hint: "看過很多所以懂很多", wrongMeanings: ["先把事情拖著，之後再看看", "遇到變化就立刻放棄原本安排", "只照表面判斷，不去追究原因"], funnyMeaning: "把「見多識廣」塞進班級群組置頂，像是在替今天的任務打前鋒" },
    { idiom: "左右逢源", meaning: "處事圓融，到處都能應對得宜", hint: "在不同場合都很順", wrongMeanings: ["等別人處理好，自己再跟上", "明知不對，還是照舊不想改", "事情還沒開始，就先想著收工"], funnyMeaning: "讓掃地機器人巡迴播放「左右逢源」，整個地板都像在上國文課" },
    { idiom: "化險為夷", meaning: "把危險轉化為平安", hint: "驚險最後平安", wrongMeanings: ["看起來很忙，其實沒有抓到重點", "只顧眼前方便，不管後面影響", "把希望都放在運氣，不主動處理"], funnyMeaning: "把「化險為夷」寫成公告貼滿教室，結果大家先笑再點頭" },
    { idiom: "相輔相成", meaning: "兩者互相幫助，彼此成就", hint: "互補才更完整", wrongMeanings: ["先把氣氛做滿，內容之後再補", "臨時想到哪裡就做到哪裡", "只求速度，不在意結果是否穩當"], funnyMeaning: "宣布今天的神祕口令就是「相輔相成」，連鬧鐘都被要求背熟" },
    { idiom: "相得益彰", meaning: "互相配合使效果更突出", hint: "放在一起更亮眼", wrongMeanings: ["表面上很努力，其實沒有真正投入", "一遇到壓力就把原則丟到旁邊", "聽了一點意見，就以為全部都懂了"], funnyMeaning: "拿著「相得益彰」開臨時記者會，最後連鉛筆盒都成了來賓" },
    { idiom: "推陳出新", meaning: "在舊基礎上創造新內容", hint: "不只是舊，也有新", wrongMeanings: ["先把事情拖著，之後再看看", "遇到變化就立刻放棄原本安排", "只照表面判斷，不去追究原因"], funnyMeaning: "先對著電風扇大聲朗讀「推陳出新」，彷彿空氣也要一起學會" },
    { idiom: "脫穎而出", meaning: "在眾人中表現特別突出", hint: "一下被看見", wrongMeanings: ["等別人處理好，自己再跟上", "明知不對，還是照舊不想改", "事情還沒開始，就先想著收工"], funnyMeaning: "把「脫穎而出」塞進班級群組置頂，像是在替今天的任務打前鋒" },
    { idiom: "明察秋毫", meaning: "觀察入微，能看出細節", hint: "連很細微都看得到", wrongMeanings: ["看起來很忙，其實沒有抓到重點", "只顧眼前方便，不管後面影響", "把希望都放在運氣，不主動處理"], funnyMeaning: "讓掃地機器人巡迴播放「明察秋毫」，整個地板都像在上國文課" },
    { idiom: "厚積薄發", meaning: "長期累積後在關鍵時刻展現實力", hint: "先累積，再爆發", wrongMeanings: ["先把氣氛做滿，內容之後再補", "臨時想到哪裡就做到哪裡", "只求速度，不在意結果是否穩當"], funnyMeaning: "把「厚積薄發」寫成公告貼滿教室，結果大家先笑再點頭" },
    { idiom: "精雕細琢", meaning: "反覆打磨，使作品更精細", hint: "細節做到最好", wrongMeanings: ["表面上很努力，其實沒有真正投入", "一遇到壓力就把原則丟到旁邊", "聽了一點意見，就以為全部都懂了"], funnyMeaning: "宣布今天的神祕口令就是「精雕細琢」，連鬧鐘都被要求背熟" }
  ],
  master: [
    { idiom: "黔驢技窮", meaning: "有限本領用盡後再無計可施", hint: "招數都用完了", wrongMeanings: ["先把事情拖著，之後再看看", "遇到變化就立刻放棄原本安排", "只照表面判斷，不去追究原因"], funnyMeaning: "把「黔驢技窮」寫成公告貼滿教室，結果大家先笑再點頭" },
    { idiom: "鳴鼓而攻之", meaning: "公開聲討某人的過失", hint: "公開批評，不再隱忍", wrongMeanings: ["等別人處理好，自己再跟上", "明知不對，還是照舊不想改", "事情還沒開始，就先想著收工"], funnyMeaning: "宣布今天的神祕口令就是「鳴鼓而攻之」，連鬧鐘都被要求背熟" },
    { idiom: "洛陽紙貴", meaning: "作品受歡迎，流傳極廣", hint: "因熱賣而供不應求", wrongMeanings: ["看起來很忙，其實沒有抓到重點", "只顧眼前方便，不管後面影響", "把希望都放在運氣，不主動處理"], funnyMeaning: "拿著「洛陽紙貴」開臨時記者會，最後連鉛筆盒都成了來賓" },
    { idiom: "投筆從戎", meaning: "棄文從武，投身軍旅", hint: "放下筆，走向戰場", wrongMeanings: ["先把氣氛做滿，內容之後再補", "臨時想到哪裡就做到哪裡", "只求速度，不在意結果是否穩當"], funnyMeaning: "先對著電風扇大聲朗讀「投筆從戎」，彷彿空氣也要一起學會" },
    { idiom: "高山流水", meaning: "比喻知音難得或樂曲高妙", hint: "懂你的人很少見", wrongMeanings: ["表面上很努力，其實沒有真正投入", "一遇到壓力就把原則丟到旁邊", "聽了一點意見，就以為全部都懂了"], funnyMeaning: "把「高山流水」塞進班級群組置頂，像是在替今天的任務打前鋒" },
    { idiom: "曲高和寡", meaning: "言論或作品高深而少人理解", hint: "太高深，附和者少", wrongMeanings: ["先把事情拖著，之後再看看", "遇到變化就立刻放棄原本安排", "只照表面判斷，不去追究原因"], funnyMeaning: "讓掃地機器人巡迴播放「曲高和寡」，整個地板都像在上國文課" },
    { idiom: "捉襟見肘", meaning: "形容窘迫，顧此失彼", hint: "資源不足，難以周全", wrongMeanings: ["等別人處理好，自己再跟上", "明知不對，還是照舊不想改", "事情還沒開始，就先想著收工"], funnyMeaning: "把「捉襟見肘」寫成公告貼滿教室，結果大家先笑再點頭" },
    { idiom: "韜光養晦", meaning: "暫時收斂鋒芒，等待時機", hint: "先低調，再出手", wrongMeanings: ["看起來很忙，其實沒有抓到重點", "只顧眼前方便，不管後面影響", "把希望都放在運氣，不主動處理"], funnyMeaning: "宣布今天的神祕口令就是「韜光養晦」，連鬧鐘都被要求背熟" },
    { idiom: "鞭辟入裡", meaning: "分析透徹，切中根本", hint: "不是表面理解", wrongMeanings: ["先把氣氛做滿，內容之後再補", "臨時想到哪裡就做到哪裡", "只求速度，不在意結果是否穩當"], funnyMeaning: "拿著「鞭辟入裡」開臨時記者會，最後連鉛筆盒都成了來賓" },
    { idiom: "膾炙人口", meaning: "作品廣為流傳，人人稱頌", hint: "大家都愛傳誦", wrongMeanings: ["表面上很努力，其實沒有真正投入", "一遇到壓力就把原則丟到旁邊", "聽了一點意見，就以為全部都懂了"], funnyMeaning: "先對著電風扇大聲朗讀「膾炙人口」，彷彿空氣也要一起學會" },
    { idiom: "登堂入室", meaning: "學問技能由淺入深達精熟", hint: "已進入高層次境界", wrongMeanings: ["先把事情拖著，之後再看看", "遇到變化就立刻放棄原本安排", "只照表面判斷，不去追究原因"], funnyMeaning: "把「登堂入室」塞進班級群組置頂，像是在替今天的任務打前鋒" },
    { idiom: "不刊之論", meaning: "正確精當、不可改動的論點", hint: "經得起推敲的定論", wrongMeanings: ["等別人處理好，自己再跟上", "明知不對，還是照舊不想改", "事情還沒開始，就先想著收工"], funnyMeaning: "讓掃地機器人巡迴播放「不刊之論」，整個地板都像在上國文課" },
    { idiom: "春秋筆法", meaning: "用簡約文字含蓄表達褒貶", hint: "字少但立場鮮明", wrongMeanings: ["看起來很忙，其實沒有抓到重點", "只顧眼前方便，不管後面影響", "把希望都放在運氣，不主動處理"], funnyMeaning: "把「春秋筆法」寫成公告貼滿教室，結果大家先笑再點頭" },
    { idiom: "微言大義", meaning: "文字精簡卻包含深刻道理", hint: "短句裡有大道理", wrongMeanings: ["先把氣氛做滿，內容之後再補", "臨時想到哪裡就做到哪裡", "只求速度，不在意結果是否穩當"], funnyMeaning: "宣布今天的神祕口令就是「微言大義」，連鬧鐘都被要求背熟" },
    { idiom: "紙上談兵", meaning: "只會空談理論，缺乏實作經驗", hint: "講得多做得少", wrongMeanings: ["表面上很努力，其實沒有真正投入", "一遇到壓力就把原則丟到旁邊", "聽了一點意見，就以為全部都懂了"], funnyMeaning: "拿著「紙上談兵」開臨時記者會，最後連鉛筆盒都成了來賓" },
    { idiom: "指鹿為馬", meaning: "故意顛倒是非，混淆黑白", hint: "明明不是卻硬說是", wrongMeanings: ["先把事情拖著，之後再看看", "遇到變化就立刻放棄原本安排", "只照表面判斷，不去追究原因"], funnyMeaning: "先對著電風扇大聲朗讀「指鹿為馬」，彷彿空氣也要一起學會" },
    { idiom: "口蜜腹劍", meaning: "表面和善，內心卻懷惡意", hint: "嘴甜但心狠", wrongMeanings: ["等別人處理好，自己再跟上", "明知不對，還是照舊不想改", "事情還沒開始，就先想著收工"], funnyMeaning: "把「口蜜腹劍」塞進班級群組置頂，像是在替今天的任務打前鋒" },
    { idiom: "城下之盟", meaning: "在壓力下被迫接受屈辱條件", hint: "情勢逼迫下簽約", wrongMeanings: ["看起來很忙，其實沒有抓到重點", "只顧眼前方便，不管後面影響", "把希望都放在運氣，不主動處理"], funnyMeaning: "讓掃地機器人巡迴播放「城下之盟」，整個地板都像在上國文課" },
    { idiom: "風聲鶴唳", meaning: "驚恐過度，聽到風吹草動都害怕", hint: "緊張到草木皆兵", wrongMeanings: ["先把氣氛做滿，內容之後再補", "臨時想到哪裡就做到哪裡", "只求速度，不在意結果是否穩當"], funnyMeaning: "把「風聲鶴唳」寫成公告貼滿教室，結果大家先笑再點頭" },
    { idiom: "草菅人命", meaning: "輕視人命，任意傷害他人", hint: "把生命當草一樣", wrongMeanings: ["表面上很努力，其實沒有真正投入", "一遇到壓力就把原則丟到旁邊", "聽了一點意見，就以為全部都懂了"], funnyMeaning: "宣布今天的神祕口令就是「草菅人命」，連鬧鐘都被要求背熟" },
    { idiom: "退避三舍", meaning: "主動退讓以避免衝突", hint: "先讓一步，不硬碰硬", wrongMeanings: ["先把事情拖著，之後再看看", "遇到變化就立刻放棄原本安排", "只照表面判斷，不去追究原因"], funnyMeaning: "拿著「退避三舍」開臨時記者會，最後連鉛筆盒都成了來賓" },
    { idiom: "圖窮匕見", meaning: "事情發展到最後露出真正意圖", hint: "最後真面目曝光", wrongMeanings: ["等別人處理好，自己再跟上", "明知不對，還是照舊不想改", "事情還沒開始，就先想著收工"], funnyMeaning: "先對著電風扇大聲朗讀「圖窮匕見」，彷彿空氣也要一起學會" },
    { idiom: "一鼓作氣", meaning: "趁士氣高昂時一口氣完成", hint: "第一波氣勢最重要", wrongMeanings: ["看起來很忙，其實沒有抓到重點", "只顧眼前方便，不管後面影響", "把希望都放在運氣，不主動處理"], funnyMeaning: "把「一鼓作氣」塞進班級群組置頂，像是在替今天的任務打前鋒" },
    { idiom: "朝令夕改", meaning: "命令或政策反覆無常", hint: "早上說的晚上就改", wrongMeanings: ["先把氣氛做滿，內容之後再補", "臨時想到哪裡就做到哪裡", "只求速度，不在意結果是否穩當"], funnyMeaning: "讓掃地機器人巡迴播放「朝令夕改」，整個地板都像在上國文課" },
    { idiom: "焚膏繼晷", meaning: "日夜辛勤學習或工作", hint: "點燈熬夜不間斷", wrongMeanings: ["表面上很努力，其實沒有真正投入", "一遇到壓力就把原則丟到旁邊", "聽了一點意見，就以為全部都懂了"], funnyMeaning: "把「焚膏繼晷」寫成公告貼滿教室，結果大家先笑再點頭" },
    { idiom: "高屋建瓴", meaning: "居高臨下，全面掌握局勢", hint: "站得高看得遠", wrongMeanings: ["先把事情拖著，之後再看看", "遇到變化就立刻放棄原本安排", "只照表面判斷，不去追究原因"], funnyMeaning: "宣布今天的神祕口令就是「高屋建瓴」，連鬧鐘都被要求背熟" },
    { idiom: "飲鴆止渴", meaning: "用有害方法解決眼前問題", hint: "短暫解決卻更危險", wrongMeanings: ["等別人處理好，自己再跟上", "明知不對，還是照舊不想改", "事情還沒開始，就先想著收工"], funnyMeaning: "拿著「飲鴆止渴」開臨時記者會，最後連鉛筆盒都成了來賓" },
    { idiom: "緣木求魚", meaning: "方法錯誤，不可能達成目標", hint: "方向錯，再努力也白費", wrongMeanings: ["看起來很忙，其實沒有抓到重點", "只顧眼前方便，不管後面影響", "把希望都放在運氣，不主動處理"], funnyMeaning: "先對著電風扇大聲朗讀「緣木求魚」，彷彿空氣也要一起學會" },
    { idiom: "越俎代庖", meaning: "超越職責代替他人做事", hint: "不該你做卻搶著做", wrongMeanings: ["先把氣氛做滿，內容之後再補", "臨時想到哪裡就做到哪裡", "只求速度，不在意結果是否穩當"], funnyMeaning: "把「越俎代庖」塞進班級群組置頂，像是在替今天的任務打前鋒" },
    { idiom: "前倨後恭", meaning: "前後態度差異大，勢利現實", hint: "先傲慢後客氣", wrongMeanings: ["表面上很努力，其實沒有真正投入", "一遇到壓力就把原則丟到旁邊", "聽了一點意見，就以為全部都懂了"], funnyMeaning: "讓掃地機器人巡迴播放「前倨後恭」，整個地板都像在上國文課" },
    { idiom: "運籌帷幄", meaning: "在幕後策劃就能掌控全局", hint: "善於策略規劃", wrongMeanings: ["先把事情拖著，之後再看看", "遇到變化就立刻放棄原本安排", "只照表面判斷，不去追究原因"], funnyMeaning: "把「運籌帷幄」寫成公告貼滿教室，結果大家先笑再點頭" },
    { idiom: "決勝千里", meaning: "憑策略在遠方取得勝利", hint: "勝負在布局時就決定", wrongMeanings: ["等別人處理好，自己再跟上", "明知不對，還是照舊不想改", "事情還沒開始，就先想著收工"], funnyMeaning: "宣布今天的神祕口令就是「決勝千里」，連鬧鐘都被要求背熟" },
    { idiom: "鞠躬盡瘁", meaning: "竭盡心力奉獻到最後", hint: "全力付出不懈怠", wrongMeanings: ["看起來很忙，其實沒有抓到重點", "只顧眼前方便，不管後面影響", "把希望都放在運氣，不主動處理"], funnyMeaning: "拿著「鞠躬盡瘁」開臨時記者會，最後連鉛筆盒都成了來賓" },
    { idiom: "死而後已", meaning: "到生命終點才停止努力", hint: "做到最後一刻", wrongMeanings: ["先把氣氛做滿，內容之後再補", "臨時想到哪裡就做到哪裡", "只求速度，不在意結果是否穩當"], funnyMeaning: "先對著電風扇大聲朗讀「死而後已」，彷彿空氣也要一起學會" },
    { idiom: "沽名釣譽", meaning: "用手段博取名聲與讚美", hint: "重名聲勝過實質", wrongMeanings: ["表面上很努力，其實沒有真正投入", "一遇到壓力就把原則丟到旁邊", "聽了一點意見，就以為全部都懂了"], funnyMeaning: "把「沽名釣譽」塞進班級群組置頂，像是在替今天的任務打前鋒" },
    { idiom: "明修棧道", meaning: "表面做一件事以掩護真正意圖", hint: "明面與暗線不同", wrongMeanings: ["先把事情拖著，之後再看看", "遇到變化就立刻放棄原本安排", "只照表面判斷，不去追究原因"], funnyMeaning: "讓掃地機器人巡迴播放「明修棧道」，整個地板都像在上國文課" },
    { idiom: "暗度陳倉", meaning: "暗中採取行動達成目的", hint: "悄悄走真正路線", wrongMeanings: ["等別人處理好，自己再跟上", "明知不對，還是照舊不想改", "事情還沒開始，就先想著收工"], funnyMeaning: "把「暗度陳倉」寫成公告貼滿教室，結果大家先笑再點頭" },
    { idiom: "請君入甕", meaning: "用對方的方法反制對方", hint: "以其人之道還治其人", wrongMeanings: ["看起來很忙，其實沒有抓到重點", "只顧眼前方便，不管後面影響", "把希望都放在運氣，不主動處理"], funnyMeaning: "宣布今天的神祕口令就是「請君入甕」，連鬧鐘都被要求背熟" },
    { idiom: "背水一戰", meaning: "抱必死決心，全力一搏", hint: "沒有退路的決戰", wrongMeanings: ["先把氣氛做滿，內容之後再補", "臨時想到哪裡就做到哪裡", "只求速度，不在意結果是否穩當"], funnyMeaning: "拿著「背水一戰」開臨時記者會，最後連鉛筆盒都成了來賓" },
    { idiom: "一傅眾咻", meaning: "正向引導少、干擾過多而難成效", hint: "學習環境被噪音破壞", wrongMeanings: ["表面上很努力，其實沒有真正投入", "一遇到壓力就把原則丟到旁邊", "聽了一點意見，就以為全部都懂了"], funnyMeaning: "先對著電風扇大聲朗讀「一傅眾咻」，彷彿空氣也要一起學會" },
    { idiom: "暴虎馮河", meaning: "有勇無謀，冒險硬上", hint: "只靠衝勁不靠策略", wrongMeanings: ["先把事情拖著，之後再看看", "遇到變化就立刻放棄原本安排", "只照表面判斷，不去追究原因"], funnyMeaning: "把「暴虎馮河」塞進班級群組置頂，像是在替今天的任務打前鋒" },
    { idiom: "沐猴而冠", meaning: "外表裝扮像樣，實質仍粗陋", hint: "外表像，內涵不到位", wrongMeanings: ["等別人處理好，自己再跟上", "明知不對，還是照舊不想改", "事情還沒開始，就先想著收工"], funnyMeaning: "讓掃地機器人巡迴播放「沐猴而冠」，整個地板都像在上國文課" },
    { idiom: "買櫝還珠", meaning: "取捨失當，只重外在忽略重點", hint: "撿外殼丟精華", wrongMeanings: ["看起來很忙，其實沒有抓到重點", "只顧眼前方便，不管後面影響", "把希望都放在運氣，不主動處理"], funnyMeaning: "把「買櫝還珠」寫成公告貼滿教室，結果大家先笑再點頭" },
    { idiom: "滄海桑田", meaning: "世事變化巨大，時移境遷", hint: "時間帶來巨變", wrongMeanings: ["先把氣氛做滿，內容之後再補", "臨時想到哪裡就做到哪裡", "只求速度，不在意結果是否穩當"], funnyMeaning: "宣布今天的神祕口令就是「滄海桑田」，連鬧鐘都被要求背熟" },
    { idiom: "物換星移", meaning: "景物和時代不斷變遷", hint: "時光流轉", wrongMeanings: ["表面上很努力，其實沒有真正投入", "一遇到壓力就把原則丟到旁邊", "聽了一點意見，就以為全部都懂了"], funnyMeaning: "拿著「物換星移」開臨時記者會，最後連鉛筆盒都成了來賓" },
    { idiom: "玩物喪志", meaning: "沉迷事物而荒廢志向", hint: "娛樂過度會失去目標", wrongMeanings: ["先把事情拖著，之後再看看", "遇到變化就立刻放棄原本安排", "只照表面判斷，不去追究原因"], funnyMeaning: "先對著電風扇大聲朗讀「玩物喪志」，彷彿空氣也要一起學會" },
    { idiom: "皮裡陽秋", meaning: "表面不說破，內含褒貶評價", hint: "話裡藏評語", wrongMeanings: ["等別人處理好，自己再跟上", "明知不對，還是照舊不想改", "事情還沒開始，就先想著收工"], funnyMeaning: "把「皮裡陽秋」塞進班級群組置頂，像是在替今天的任務打前鋒" },
    { idiom: "含英咀華", meaning: "細細體會作品精華", hint: "慢慢品味文字之美", wrongMeanings: ["看起來很忙，其實沒有抓到重點", "只顧眼前方便，不管後面影響", "把希望都放在運氣，不主動處理"], funnyMeaning: "讓掃地機器人巡迴播放「含英咀華」，整個地板都像在上國文課" },
    { idiom: "金科玉律", meaning: "不可違背的準則或規範", hint: "像定律一樣重要", wrongMeanings: ["先把氣氛做滿，內容之後再補", "臨時想到哪裡就做到哪裡", "只求速度，不在意結果是否穩當"], funnyMeaning: "把「金科玉律」寫成公告貼滿教室，結果大家先笑再點頭" },
    { idiom: "釜底抽薪", meaning: "從根本處解決問題", hint: "斷掉問題來源", wrongMeanings: ["表面上很努力，其實沒有真正投入", "一遇到壓力就把原則丟到旁邊", "聽了一點意見，就以為全部都懂了"], funnyMeaning: "宣布今天的神祕口令就是「釜底抽薪」，連鬧鐘都被要求背熟" }
  ]
};

function normalizeIdiomBank(bank) {
  const normalized = {};
  for (const level in bank) {
    if (!Object.prototype.hasOwnProperty.call(bank, level)) {
      continue;
    }
    const items = bank[level];
    const meaningPool = items.map((entry) => entry.meaning);
    normalized[level] = items.map((item) => ({
      idiom: item.idiom,
      meaning: item.meaning,
      hint: item.hint,
      image: typeof item.image === "string" ? item.image : "",
      imageAlt: typeof item.imageAlt === "string" ? item.imageAlt : `${item.idiom} 插圖`,
      wrongMeanings: normalizeWrongMeanings(item, meaningPool),
      funnyMeaning:
        normalizeFunnyMeaning(item.funnyMeaning, item.idiom)
    }));
  }
  return normalized;
}

function normalizeFunnyMeaning(rawFunny, idiom) {
  const fallbackLegacy = `把「${idiom}」寫進便當菜單再交作業`;
  const raw = typeof rawFunny === "string" ? rawFunny.trim() : "";
  if (raw && raw !== fallbackLegacy) {
    return raw;
  }
  return createDefaultFunnyMeaning(idiom);
}

function normalizeWrongMeanings(item, meaningPool) {
  const manualWrong =
    Array.isArray(item.wrongMeanings)
      ? item.wrongMeanings.filter((entry) => typeof entry === "string" && entry !== item.meaning)
      : [];
  const dedupedManual = dedupeStrings(manualWrong);
  if (dedupedManual.length >= 3) {
    return dedupedManual.slice(0, 3);
  }
  return generateWrongMeanings(item, meaningPool, dedupedManual);
}

function generateWrongMeanings(item, meaningPool, seedList) {
  const selected = [...seedList];
  const filtered = meaningPool.filter(
    (candidate) =>
      candidate !== item.meaning &&
      !selected.includes(candidate) &&
      !isLikelyEquivalentMeaning(item.meaning, candidate)
  );
  const fallbackPool = meaningPool.filter(
    (candidate) => candidate !== item.meaning && !selected.includes(candidate)
  );

  pickDeterministic(selected, filtered, item.idiom, item.meaning, 3);
  if (selected.length < 3) {
    pickDeterministic(selected, fallbackPool, item.idiom, `${item.meaning}-fallback`, 3);
  }
  return selected.slice(0, 3);
}

function pickDeterministic(selected, source, idiom, salt, targetLength) {
  const pool = [...source];
  let cursor = hashString(`${idiom}|${salt}`) || 1;
  while (selected.length < targetLength && pool.length > 0) {
    const index = cursor % pool.length;
    selected.push(pool[index]);
    pool.splice(index, 1);
    cursor = (cursor * 7 + 17) % 9973;
  }
}

function isLikelyEquivalentMeaning(a, b) {
  if (a === b) {
    return true;
  }
  const aa = normalizeMeaningText(a);
  const bb = normalizeMeaningText(b);
  if (!aa || !bb) {
    return false;
  }
  if (aa === bb) {
    return true;
  }
  const jaccard = charJaccard(aa, bb);
  if (jaccard >= 0.45) {
    return true;
  }
  const bigramOverlap = overlappingBigramCount(aa, bb);
  if (bigramOverlap >= 2 && Math.abs(aa.length - bb.length) <= 3) {
    return true;
  }
  return false;
}

function normalizeMeaningText(text) {
  return text.replace(/[，。！？、；：「」『』（）\s]/g, "");
}

function charJaccard(a, b) {
  const setA = new Set(a.split(""));
  const setB = new Set(b.split(""));
  let intersection = 0;
  setA.forEach((char) => {
    if (setB.has(char)) {
      intersection += 1;
    }
  });
  const union = new Set([...setA, ...setB]).size;
  return union === 0 ? 0 : intersection / union;
}

function overlappingBigramCount(a, b) {
  const bigramsA = new Set();
  const bigramsB = new Set();
  for (let i = 0; i < a.length - 1; i += 1) {
    bigramsA.add(a.slice(i, i + 2));
  }
  for (let i = 0; i < b.length - 1; i += 1) {
    bigramsB.add(b.slice(i, i + 2));
  }
  let overlap = 0;
  bigramsA.forEach((gram) => {
    if (bigramsB.has(gram)) {
      overlap += 1;
    }
  });
  return overlap;
}

function dedupeStrings(list) {
  const seen = new Set();
  const result = [];
  list.forEach((entry) => {
    if (!seen.has(entry)) {
      seen.add(entry);
      result.push(entry);
    }
  });
  return result;
}

function hashString(text) {
  let hash = 0;
  for (let i = 0; i < text.length; i += 1) {
    hash = (hash * 31 + text.charCodeAt(i)) % 2147483647;
  }
  return hash;
}

function createDefaultFunnyMeaning(idiom) {
  const setup = [
    `把「${idiom}」貼在冰箱上，`,
    `拿著「${idiom}」對電風扇大喊，`,
    `宣布「${idiom}」是今天的神祕口令，`,
    `先跟鉛筆討論「${idiom}」，`,
    `把「${idiom}」寫進班級群組公告，`,
    `請鬧鐘朗讀三遍「${idiom}」，`,
    `讓掃地機器人背誦「${idiom}」，`,
    `把「${idiom}」印在便當盒蓋上，`
  ];
  const action = [
    "再去交作業",
    "然後按下開始鍵",
    "接著請貓咪當評審",
    "最後再投一張請假單",
    "再去挑戰最終魔王",
    "然後全班一起拍手",
    "接著宣布進入宇宙模式",
    "最後才想起要選答案"
  ];
  const hash = hashString(idiom);
  const left = setup[hash % setup.length];
  const right = action[(hash * 7 + 13) % action.length];
  return `${left}${right}`;
}

function collectBankDiagnostics(rawBank) {
  const diagnostics = {
    total: 0,
    levels: {},
    duplicateIdioms: [],
    legacyFunnyMeaningCount: 0,
    missingWrongMeaningsCount: 0
  };
  const idiomCounter = {};

  Object.entries(rawBank).forEach(([level, items]) => {
    diagnostics.levels[level] = {
      count: items.length,
      legacyFunnyMeaningCount: 0,
      missingWrongMeaningsCount: 0
    };

    items.forEach((item) => {
      diagnostics.total += 1;
      idiomCounter[item.idiom] = (idiomCounter[item.idiom] || 0) + 1;

      const legacyFunnyMeaning = `把「${item.idiom}」寫進便當菜單再交作業`;
      if (item.funnyMeaning === legacyFunnyMeaning) {
        diagnostics.legacyFunnyMeaningCount += 1;
        diagnostics.levels[level].legacyFunnyMeaningCount += 1;
      }

      if (!Array.isArray(item.wrongMeanings) || item.wrongMeanings.length < 3) {
        diagnostics.missingWrongMeaningsCount += 1;
        diagnostics.levels[level].missingWrongMeaningsCount += 1;
      }
    });
  });

  diagnostics.duplicateIdioms = Object.entries(idiomCounter)
    .filter(([, count]) => count > 1)
    .map(([idiom, count]) => ({ idiom, count }));

  return diagnostics;
}

window.IDIOM_BANK = normalizeIdiomBank(RAW_IDIOM_BANK);
window.IDIOM_BANK_DIAGNOSTICS = collectBankDiagnostics(RAW_IDIOM_BANK);
