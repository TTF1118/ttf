const STORAGE_PREFIX="starlingRpg:v2:",ACCOUNT_PREFIX="starlingRpg:account:",LAST_ACCOUNT_KEY="starlingRpg:lastAccount:v2",IDLE_CAP_MS=8*60*60*1e3,IDLE_TICK_MS=1e3,AUTO_CAMPAIGN_MS=6e3,STAMINA_CAP_LIMIT=160,elements={leaf:"森",fire:"火",water:"水",thunder:"雷",light:"光",shadow:"影",metal:"钢"},roles={guard:"前排",strike:"强攻",blast:"群攻",support:"辅助",control:"控制"},starters=["sprout","spark","shell"],monsters=[{id:"sprout",name:"芽芽狐",rare:"N",element:"leaf",role:"support",skill:"藤芽鼓舞",hp:88,atk:20,def:15,spd:15,bio:"新手森林里最常见的伙伴，擅长稳定回复。"},{id:"spark",name:"电团鼠",rare:"N",element:"thunder",role:"strike",skill:"电弧连击",hp:74,atk:27,def:11,spd:23,bio:"行动很快，适合早期推图补伤害。"},{id:"shell",name:"潮壳龟",rare:"N",element:"water",role:"guard",skill:"潮壳护阵",hp:110,atk:18,def:25,spd:8,bio:"耐打的前排，能让队伍更稳。"},{id:"moss",name:"苔石兽",rare:"N",element:"leaf",role:"guard",skill:"硬壳扎根",hp:116,atk:17,def:23,spd:7,bio:"普通但可靠的防线。"},{id:"bubble",name:"泡泡鸭",rare:"N",element:"water",role:"control",skill:"泡影迟缓",hp:82,atk:21,def:13,spd:17,bio:"能拖慢敌人的节奏。"},{id:"cinder",name:"灰烬犬",rare:"R",element:"fire",role:"strike",skill:"炽牙撕咬",hp:92,atk:34,def:14,spd:20,bio:"火系单体输出，适合打首领。"},{id:"glider",name:"云翼狸",rare:"R",element:"light",role:"support",skill:"云羽守护",hp:96,atk:24,def:18,spd:18,bio:"提升小队生存，挂机收益稳定。"},{id:"magnet",name:"磁尾鼬",rare:"R",element:"thunder",role:"control",skill:"磁场牵引",hp:86,atk:28,def:16,spd:22,bio:"控制型伙伴，能压住高速敌人。"},{id:"reef",name:"珊瑚鹿",rare:"R",element:"water",role:"support",skill:"潮汐复苏",hp:98,atk:23,def:17,spd:16,bio:"水系治疗，适合长线挂机。"},{id:"thorn",name:"刺藤熊",rare:"R",element:"leaf",role:"guard",skill:"荆棘反震",hp:132,atk:23,def:29,spd:9,bio:"反伤前排，推图容错高。"},{id:"ember",name:"炽尾猫",rare:"SR",element:"fire",role:"strike",skill:"尾焰突袭",hp:100,atk:43,def:16,spd:25,bio:"高爆发输出，首领战表现突出。"},{id:"moon",name:"月铃鹿",rare:"SR",element:"light",role:"support",skill:"月辉治愈",hp:108,atk:30,def:22,spd:19,bio:"兼具治疗和护盾的核心辅助。"},{id:"rune",name:"符文鸮",rare:"SR",element:"shadow",role:"blast",skill:"夜幕法阵",hp:94,atk:40,def:15,spd:21,bio:"影系群攻，适合快速清图。"},{id:"bronze",name:"铜甲犀",rare:"SR",element:"metal",role:"guard",skill:"重甲冲锋",hp:152,atk:29,def:35,spd:8,bio:"稳定前排，能抗高压关卡。"},{id:"lotus",name:"莲灯兔",rare:"SR",element:"leaf",role:"support",skill:"莲灯净化",hp:104,atk:28,def:20,spd:24,bio:"辅助与驱散兼备。"},{id:"storm",name:"岚雷鹰",rare:"SR",element:"thunder",role:"blast",skill:"落雷风暴",hp:96,atk:42,def:15,spd:28,bio:"高速群攻，挂机清怪效率高。"},{id:"iron",name:"铁角犀",rare:"SSR",element:"metal",role:"guard",skill:"钢壁阵列",hp:184,atk:36,def:46,spd:10,bio:"顶级前排，越到后期越稳。"},{id:"phoenix",name:"绯羽凰",rare:"SSR",element:"fire",role:"blast",skill:"赤羽天火",hp:126,atk:58,def:22,spd:26,bio:"火系群攻核心，推图速度很快。"},{id:"levi",name:"深潮鲸",rare:"SSR",element:"water",role:"guard",skill:"深潮壁垒",hp:198,atk:34,def:42,spd:7,bio:"高血量守护者，适合越级挑战。"},{id:"nova",name:"星核龙",rare:"SSR",element:"light",role:"strike",skill:"星核裁决",hp:138,atk:62,def:24,spd:23,bio:"单体爆发极高，首领克星。"},{id:"shade",name:"影镰蛛",rare:"SSR",element:"shadow",role:"control",skill:"暗网封锁",hp:122,atk:50,def:21,spd:31,bio:"高速控制，适合挑战塔。"},{id:"terra",name:"古森龟",rare:"UR",element:"leaf",role:"guard",skill:"万木归根",hp:230,atk:42,def:56,spd:8,bio:"传说级守护者，能保护全队。"},{id:"aurora",name:"极光狐",rare:"UR",element:"light",role:"support",skill:"极光赐福",hp:154,atk:45,def:32,spd:30,bio:"传说级辅助，提升全队挂机效率。"},{id:"volt",name:"雷霆麒麟",rare:"UR",element:"thunder",role:"blast",skill:"万钧雷域",hp:150,atk:68,def:26,spd:34,bio:"传说级群攻，后期清图主力。"},{id:"seedling",name:"叶团狸",rare:"N",element:"leaf",role:"support",skill:"叶露滋养",hp:84,atk:19,def:16,spd:16,bio:"常见的森系伙伴，能补少量续航。"},{id:"flint",name:"火绒兔",rare:"N",element:"fire",role:"strike",skill:"火绒扑击",hp:78,atk:26,def:12,spd:21,bio:"动作灵活，前期补刀稳定。"},{id:"drizzle",name:"雨滴蛙",rare:"N",element:"water",role:"control",skill:"水泡牵制",hp:86,atk:20,def:14,spd:18,bio:"用水泡干扰敌人行动。"},{id:"tin",name:"锡壳虫",rare:"N",element:"metal",role:"guard",skill:"薄壳防御",hp:120,atk:16,def:24,spd:7,bio:"普通防御型伙伴，适合过渡。"},{id:"mote",name:"光点雀",rare:"N",element:"light",role:"support",skill:"微光引导",hp:80,atk:22,def:12,spd:22,bio:"轻量辅助，能提升队伍节奏。"},{id:"shadebud",name:"影芽鼠",rare:"N",element:"shadow",role:"control",skill:"影缠",hp:76,atk:24,def:11,spd:24,bio:"擅长短暂牵制目标。"},{id:"coal",name:"煤球兽",rare:"R",element:"fire",role:"guard",skill:"余烬护甲",hp:124,atk:25,def:28,spd:10,bio:"火系耐久伙伴，可承受持续伤害。"},{id:"spray",name:"浪花貂",rare:"R",element:"water",role:"strike",skill:"浪切",hp:90,atk:35,def:15,spd:21,bio:"水系快速输出，适合清理后排。"},{id:"ivy",name:"藤甲鹿",rare:"R",element:"leaf",role:"guard",skill:"藤盾",hp:136,atk:22,def:31,spd:9,bio:"稳定前排，能吸收更多普攻。"},{id:"pulse",name:"脉冲鸽",rare:"R",element:"thunder",role:"blast",skill:"脉冲扩散",hp:88,atk:31,def:14,spd:24,bio:"雷系小范围输出。"},{id:"gleam",name:"辉尾猫",rare:"R",element:"light",role:"support",skill:"辉尾祈愿",hp:100,atk:23,def:18,spd:19,bio:"轻度治疗和护盾都能提供。"},{id:"nightjar",name:"夜啼雀",rare:"R",element:"shadow",role:"control",skill:"夜啼扰魂",hp:84,atk:29,def:15,spd:25,bio:"压制敌方速度，适合控制队。"},{id:"silver",name:"银针鼬",rare:"R",element:"metal",role:"strike",skill:"银针连刺",hp:88,atk:36,def:17,spd:22,bio:"钢系单点输出，成长平滑。"},{id:"maple",name:"枫角羊",rare:"R",element:"leaf",role:"support",skill:"枫叶祝福",hp:106,atk:24,def:20,spd:17,bio:"提供队伍增益和少量回复。"},{id:"flare",name:"焰冠鸡",rare:"SR",element:"fire",role:"blast",skill:"焰冠爆鸣",hp:104,atk:44,def:17,spd:24,bio:"火系群攻伙伴，推图效率高。"},{id:"tide",name:"潮音鲸",rare:"SR",element:"water",role:"support",skill:"潮音回响",hp:130,atk:30,def:25,spd:15,bio:"治疗和减伤兼备。"},{id:"vine",name:"蔓生蝶",rare:"SR",element:"leaf",role:"control",skill:"蔓网封路",hp:92,atk:36,def:18,spd:27,bio:"控制型森系伙伴。"},{id:"arc",name:"弧光豹",rare:"SR",element:"thunder",role:"strike",skill:"弧光突袭",hp:102,atk:46,def:16,spd:30,bio:"高速单体输出。"},{id:"halo",name:"圣环鹿",rare:"SR",element:"light",role:"support",skill:"圣环庇护",hp:118,atk:29,def:26,spd:20,bio:"提供稳定护盾。"},{id:"wraith",name:"幽纹狐",rare:"SR",element:"shadow",role:"control",skill:"幽纹锁链",hp:96,atk:38,def:17,spd:26,bio:"适合打断敌方节奏。"},{id:"gearox",name:"齿轮牛",rare:"SR",element:"metal",role:"guard",skill:"齿轮壁垒",hp:158,atk:28,def:38,spd:7,bio:"钢系中坚前排。"},{id:"sakura",name:"樱灯狐",rare:"SR",element:"leaf",role:"support",skill:"樱灯复苏",hp:110,atk:31,def:21,spd:23,bio:"续航型辅助，适合挂机。"},{id:"basalt",name:"玄岩龟",rare:"SSR",element:"metal",role:"guard",skill:"玄岩镇守",hp:206,atk:35,def:50,spd:6,bio:"高防御前排，适合首领战。"},{id:"sunspark",name:"日焰狮",rare:"SSR",element:"fire",role:"strike",skill:"日焰裁断",hp:136,atk:64,def:23,spd:24,bio:"火系爆发核心。"},{id:"glacier",name:"冰潮龙",rare:"SSR",element:"water",role:"control",skill:"冰潮禁锢",hp:142,atk:48,def:28,spd:22,bio:"水系控制和输出兼具。"},{id:"forestking",name:"森王鹿",rare:"SSR",element:"leaf",role:"support",skill:"森王赐福",hp:150,atk:38,def:34,spd:21,bio:"高阶团队辅助。"},{id:"thundra",name:"雷镜蛇",rare:"SSR",element:"thunder",role:"strike",skill:"雷镜穿刺",hp:124,atk:60,def:22,spd:32,bio:"高速穿透输出。"},{id:"seraph",name:"辉翼天马",rare:"SSR",element:"light",role:"support",skill:"辉翼净化",hp:144,atk:42,def:30,spd:25,bio:"净化和护盾能力突出。"},{id:"abyss",name:"渊影狼",rare:"SSR",element:"shadow",role:"blast",skill:"渊影裂域",hp:128,atk:56,def:22,spd:29,bio:"影系群攻核心。"},{id:"meteor",name:"陨铁猿",rare:"SSR",element:"metal",role:"strike",skill:"陨铁重击",hp:152,atk:55,def:32,spd:17,bio:"重击型钢系输出。"},{id:"worldtree",name:"世界树灵",rare:"SSR",element:"leaf",role:"support",skill:"万叶领域",hp:180,atk:48,def:40,spd:28,bio:"高阶辅助，提升全队续航。"},{id:"solar",name:"太阳狮鹫",rare:"UR",element:"fire",role:"blast",skill:"太阳风暴",hp:162,atk:74,def:30,spd:31,bio:"传说级火系群攻。"},{id:"kraken",name:"深渊章王",rare:"UR",element:"water",role:"control",skill:"深渊潮锁",hp:198,atk:58,def:42,spd:20,bio:"传说级控制前排。"},{id:"zeus",name:"雷域神鹿",rare:"SSR",element:"thunder",role:"strike",skill:"雷域审判",hp:166,atk:76,def:29,spd:36,bio:"高阶高速输出。"},{id:"eclipse",name:"蚀月鸦",rare:"UR",element:"shadow",role:"blast",skill:"蚀月黑潮",hp:154,atk:72,def:28,spd:34,bio:"传说级影系清场核心。"},{id:"aegis",name:"星盾巨像",rare:"UR",element:"metal",role:"guard",skill:"星盾要塞",hp:250,atk:45,def:64,spd:9,bio:"传说级守护者，抗压极强。"},{id:"prism",name:"棱光龙",rare:"SSR",element:"light",role:"strike",skill:"棱光裁线",hp:160,atk:73,def:31,spd:33,bio:"高阶光系单体核心。"},{id:"emberlord",name:"炎狱麒麟",rare:"SSR",element:"fire",role:"strike",skill:"炎狱踏破",hp:172,atk:78,def:33,spd:30,bio:"后期强攻王牌。"},{id:"pebble",name:"卵石龟",rare:"N",element:"metal",role:"guard",skill:"卵石护身",hp:118,atk:15,def:25,spd:6,bio:"低阶守护伙伴，耐久不错。"},{id:"dewcat",name:"露珠猫",rare:"N",element:"water",role:"support",skill:"露珠轻疗",hp:82,atk:20,def:13,spd:20,bio:"新手常见的水系辅助。"},{id:"ashfox",name:"灰焰狐",rare:"R",element:"fire",role:"control",skill:"灰焰迷烟",hp:92,atk:30,def:16,spd:23,bio:"用烟雾扰乱敌方阵型。"},{id:"goldfin",name:"金鳍鱼",rare:"R",element:"water",role:"support",skill:"金鳍祝潮",hp:102,atk:24,def:19,spd:18,bio:"提供持续恢复和水系增益。"},{id:"lampmoth",name:"灯翼蛾",rare:"SR",element:"light",role:"support",skill:"灯翼守望",hp:108,atk:32,def:23,spd:25,bio:"光系护盾辅助。"},{id:"quakebear",name:"震岩熊",rare:"SR",element:"metal",role:"guard",skill:"震岩压制",hp:166,atk:31,def:40,spd:8,bio:"兼具前排和压制能力。"},{id:"mirage",name:"幻沙狐",rare:"SSR",element:"shadow",role:"control",skill:"幻沙迷阵",hp:130,atk:49,def:24,spd:33,bio:"高阶控制伙伴，擅长拖慢首领。"},{id:"skywhale",name:"云海鲸",rare:"SSR",element:"water",role:"support",skill:"云海潮歌",hp:164,atk:40,def:36,spd:19,bio:"高阶治疗核心。"},{id:"cosmos",name:"星界鹿",rare:"SSR",element:"light",role:"support",skill:"星界回响",hp:176,atk:54,def:38,spd:32,bio:"高阶光系辅助，适合长线作战。"},{id:"nether",name:"冥河龙",rare:"SSR",element:"shadow",role:"control",skill:"冥河封域",hp:188,atk:64,def:36,spd:27,bio:"高阶控制核心，能压制高难敌人。"}],equipmentRarity={N:{name:"N",color:"n",power:45},R:{name:"R",color:"r",power:120},SR:{name:"SR",color:"sr",power:260},SSR:{name:"SSR",color:"ssr",power:560}},EQUIP_SLOTS={WEAPON:"武器",ARMOR:"衣服",AURA:"光环"},SLOT_WEIGHTS={武器:40,衣服:40,光环:20};function getEquipSlot(eid){const def=equipmentDef(eid),slot=def.slot;return slot==="武器"||slot==="衣服"||slot==="光环"?slot:slot==="护甲"?"衣服":slot==="饰品"?"光环":"武器"}const equipmentPool=[{id:"leaf_charm",name:"新叶护符",slot:"光环",rare:"white",atk:4,def:7,hp:28,desc:"入门护符，提供少量生命和防御。"},{id:"copper_claw",name:"铜制利爪",slot:"武器",rare:"green",atk:12,def:3,hp:20,desc:"适合前期输出伙伴。"},{id:"mist_shell",name:"雾湖甲壳",slot:"衣服",rare:"green",atk:5,def:16,hp:48,desc:"提高前排稳定性。"},{id:"storm_ring",name:"岚雷指环",slot:"光环",rare:"blue",atk:22,def:8,hp:42,desc:"增加速度型伙伴的爆发。"},{id:"moon_staff",name:"月辉短杖",slot:"武器",rare:"blue",atk:18,def:12,hp:70,desc:"辅助伙伴常用装备。"},{id:"rune_mail",name:"符文战甲",slot:"衣服",rare:"purple",atk:16,def:34,hp:120,desc:"中期防御核心装备。"},{id:"phoenix_blade",name:"绯羽刃",slot:"武器",rare:"purple",atk:46,def:12,hp:90,desc:"高攻击紫装，适合强攻。"},{id:"star_core",name:"星核吊坠",slot:"光环",rare:"orange",atk:56,def:26,hp:180,desc:"橙色饰品，提供全面属性。"},{id:"dragon_scale",name:"龙鳞重甲",slot:"衣服",rare:"orange",atk:34,def:72,hp:260,desc:"首领战前排装备。"},{id:"aurora_crown",name:"极光冠冕",slot:"光环",rare:"red",atk:88,def:58,hp:360,desc:"红色传说装备，稀有且强力。"},{id:"reed_dagger",name:"芦叶短刃",slot:"武器",rare:"white",atk:7,def:2,hp:18,desc:"轻便的入门武器。"},{id:"cloth_robe",name:"训练布甲",slot:"衣服",rare:"white",atk:2,def:9,hp:34,desc:"训练师常备的基础护甲。"},{id:"ember_band",name:"余烬臂环",slot:"光环",rare:"green",atk:11,def:6,hp:38,desc:"提供少量攻击和生命。"},{id:"wave_guard",name:"浪纹护肩",slot:"衣服",rare:"green",atk:4,def:18,hp:58,desc:"水系伙伴常用防具。"},{id:"iron_spear",name:"铁木长枪",slot:"武器",rare:"green",atk:16,def:5,hp:28,desc:"可靠的前期武器。"},{id:"spark_lens",name:"电光镜片",slot:"光环",rare:"blue",atk:24,def:6,hp:55,desc:"适合高速输出伙伴。"},{id:"forest_cloak",name:"森语斗篷",slot:"衣服",rare:"blue",atk:10,def:26,hp:92,desc:"兼具生命和防御。"},{id:"shadow_blade",name:"影纹短刃",slot:"武器",rare:"blue",atk:30,def:8,hp:50,desc:"影系攻击装备。"},{id:"sun_medal",name:"日辉勋章",slot:"光环",rare:"purple",atk:34,def:20,hp:130,desc:"紫色通用饰品。"},{id:"thunder_armor",name:"雷纹战甲",slot:"衣服",rare:"purple",atk:20,def:42,hp:150,desc:"提高生存和反击能力。"},{id:"crystal_bow",name:"晶羽长弓",slot:"武器",rare:"purple",atk:52,def:10,hp:86,desc:"适合高速强攻伙伴。"},{id:"deep_orb",name:"深潮宝珠",slot:"光环",rare:"purple",atk:28,def:28,hp:170,desc:"水系辅助偏爱的装备。"},{id:"solar_sword",name:"日冕长剑",slot:"武器",rare:"orange",atk:68,def:22,hp:160,desc:"橙色攻击装备。"},{id:"world_bark",name:"古树重铠",slot:"衣服",rare:"orange",atk:28,def:78,hp:310,desc:"森系前排核心装备。"},{id:"void_chain",name:"虚空锁链",slot:"光环",rare:"orange",atk:60,def:30,hp:210,desc:"兼具控制和输出属性。"},{id:"storm_crown",name:"雷暴王冠",slot:"光环",rare:"orange",atk:64,def:24,hp:190,desc:"雷系输出毕业饰品。"},{id:"star_halberd",name:"星辉战戟",slot:"武器",rare:"red",atk:98,def:42,hp:300,desc:"红色传说武器，爆发极高。"},{id:"origin_mail",name:"源初神甲",slot:"衣服",rare:"red",atk:62,def:96,hp:440,desc:"红色传说护甲，守护核心。"},{id:"eclipse_eye",name:"蚀月之眼",slot:"光环",rare:"red",atk:92,def:60,hp:380,desc:"影系传说饰品。"},{id:"heaven_ring",name:"天界指环",slot:"光环",rare:"red",atk:84,def:70,hp:420,desc:"光系传说饰品，属性全面。"}],enhanceMaxByRare={N:3,R:3,SR:5,SSR:10,UR:20},enhanceRates={N:[100,82,65],R:[100,78,58],SR:[96,82,68,52,38],SSR:[92,82,72,62,52,44,36,30,24,20],UR:[88,80,72,65,58,51,45,39,34,29,25,21,18,15,12,10,8,6,5,4]},rarityOrder={UR:5,SSR:4,SR:3,R:2,N:1},equipOrder={SSR:4,SR:3,R:2,N:1};function sortedMonsters(list=monsters){return[...list].sort((a,b)=>rarityOrder[b.rare]-rarityOrder[a.rare]||a.name.localeCompare(b.name,"zh-CN"))}function sortedEquipmentPool(list=equipmentPool){return[...list].sort((a,b)=>equipOrder[equipmentRareKey(b)]-equipOrder[equipmentRareKey(a)]||a.name.localeCompare(b.name,"zh-CN"))}function sortedRoster(list=state.data?.roster||[]){return[...list].sort((a,b)=>{const ma=monster(a.mid),mb=monster(b.mid);return rarityOrder[mb.rare]-rarityOrder[ma.rare]||(b.enhance||0)-(a.enhance||0)||petPower(b)-petPower(a)})}const chapters=[["新芽原野","训练用的低阶野怪和资源点。"],["电波山岭","敌人速度提升，适合补控制。"],["潮雾湖区","防御型敌人增多，需要稳定输出。"],["赤炉矿坑","首领伤害较高，前排和治疗更重要。"],["星辉遗迹","综合检验阵容、星级和装备。"]],enemyNames=["巡游史莱姆","蘑菇哨兵","草叶盗团","磁尾猎手","雷鸣守卫","浮空石偶","泡影蟹","湖雾祭司","珊瑚卫兵","熔岩球","赤炉矿灵","火蜥队长","星尘斥候","遗迹石像","星辉守门者","古代核心"],stages=Array.from({length:40},(_,index)=>{const id=index+1,chapter=Math.floor(index/8),step=index%8+1,boss=step===8,power=Math.floor(95+id*42+Math.pow(id,1.34)*12+(boss?130+chapter*55:0));return{id,chapter:chapter+1,name:chapters[chapter][0]+" "+step,enemy:boss?chapters[chapter][0]+"首领":enemyNames[index%enemyNames.length],boss,power,reward:{gold:42+id*16+(boss?80:0),food:26+id*9+(boss?50:0),shard:boss?2+chapter:id%3===0?1:0,gem:boss?10+chapter*4:0}}}),tasks=[{id:"claimIdle",type:"日常",title:"领取一次挂机收益",done:s=>s.stats.idleClaims>=1,reward:{gold:160,food:90}},{id:"clear5",type:"成长",title:"通关第 5 关",done:s=>s.clearedStage>=5,reward:{ticket:2,gem:30}},{id:"team3",type:"成长",title:"上阵 3 名伙伴",done:s=>s.active.length>=3,reward:{shard:8}},{id:"summon5",type:"日常",title:"累计召唤 5 次",done:s=>s.stats.summons>=5,reward:{ticket:1,gold:260}},{id:"level10",type:"成长",title:"任意伙伴达到 10 级",done:s=>s.roster.some(p=>p.level>=10),reward:{gem:50,shard:10}},{id:"clear16",type:"成长",title:"击败第二章首领",done:s=>s.clearedStage>=16,reward:{ticket:3,food:600}},{id:"tower5",type:"挑战",title:"试炼塔达到 5 层",done:s=>s.towerFloor>=5,reward:{gem:80,shard:12}}],state={account:"",authMode:"login",screen:"auth",view:"home",summonTab:"pet",bagTab:"items",equipFilter:"all",selectedPetUid:null,breakPetUid:null,breakAnimating:false,breakResult:null,breakUseBoost:false,breakUseProtect:false,accountMenu:false,chatMessages:[],modal:"",data:null,log:[],ticker:null,autoCampaignTimer:null,autoCampaignNextAt:0};let activeEquipSlot=null,adminPanelVisible=!1;const navItems=[["home","大厅","⌂"],["campaign","冒险","⚔"],["team","伙伴","◆"],["growth","养成","▲"],["summon","召唤","✦"],["tasks","任务","✓"],["shop","商店","◈"],["bag","背包","🎒"]],resourceMeta={gold:["金币","●","训练、商店和基础强化消耗"],gem:["钻石","◆","购买召唤券、体力和高级道具"],ticket:["召唤券","✦","用于抽取新的伙伴宝宝"],food:["经验果","▲","用于提升伙伴等级"],shard:["星尘","✧","升星和装备强化材料"],stamina:["体力","⚡","手动推图和快速扫荡消耗"],idle:["挂机","⏱","当前可领取的离线/在线挂机时长"]};function uid(){return crypto.randomUUID?crypto.randomUUID():Date.now()+"-"+Math.random()}function createPet(mid,level=1){return{uid:uid(),mid,level,exp:0,stars:1,gear:0,copies:0,locked:!1}}function createEquip(eid){return{uid:uid(),eid,level:0,petUid:""}}function defaultSave(accountName,playerName,starter="sprout"){const first=createPet(starter,1);return{version:2,accountName,name:playerName,title:"新晋训练师",gold:980,gem:120,ticket:8,food:420,shard:18,protectCard:0,boostCard:0,urTicket:0,firstCharge:!1,firstChargeSignDays:[],firstChargeSignDate:null,stamina:40,maxStamina:40,clearedStage:0,farmingStage:1,active:[first.uid],roster:[first],equipment:[],claimed:[],usedCodes:[],battleRecords:[],chatMessages:[],inbox:[{id:"welcome",title:"启程补给",reward:{ticket:3,food:300,gold:500}}],stats:{wins:0,losses:0,summons:0,equipDraws:0,idleClaims:0,sweeps:0,towerWins:0},towerFloor:0,pity:0,equipPity:0,dailyDraw:{date:currentDateKey(),goldPet:0},lastIdleAt:Date.now(),lastStaminaAt:Date.now()}}function saveKey(account){return STORAGE_PREFIX+account}function accountKey(account){return ACCOUNT_PREFIX+account}function readAccount(account){const raw=localStorage.getItem(accountKey(account));return raw?JSON.parse(raw):null}function writeAccount(account,payload){localStorage.setItem(accountKey(account),JSON.stringify(payload))}function getMonthCardPlayers(){const raw=localStorage.getItem("starlingRpg:monthCardPlayers");if(!raw)return{};try{return JSON.parse(raw)||{}}catch{return{}}}function saveMonthCardPlayers(players){localStorage.setItem("starlingRpg:monthCardPlayers",JSON.stringify(players))}function hasMonthCard(playerName){const players=getMonthCardPlayers(),data=players[playerName];if(!data)return!1;if(Date.now()>data.expiresAt){return delete players[playerName],saveMonthCardPlayers(players),!1}return!0}function getMonthCardData(playerName){const players=getMonthCardPlayers();return players[playerName]||null}function getMonthCardDaysLeft(playerName){const data=getMonthCardData(playerName);if(!data)return 0;const diff=data.expiresAt-Date.now();return Math.max(0,Math.ceil(diff/(24*60*60*1e3)))}function hasGameSave(account){return Boolean(localStorage.getItem(saveKey(account)))}function currentDateKey(){return(new Date).toISOString().slice(0,10)}function monster(mid){return monsters.find(item=>item.id===mid)||monsters[0]}function petDisplayName(pet){return pet?.nickname||monster(pet?.mid).name}function equipmentDef(eid){return equipmentPool.find(item=>item.id===eid)||equipmentPool[0]}function equipmentRareKey(item){const rare=typeof item=="string"?item:item?.rare;return rare==="red"||rare==="orange"||rare==="SSR"?"SSR":rare==="purple"||rare==="SR"?"SR":rare==="blue"||rare==="R"?"R":"N"}function stageById(id){if(id <= 0) return stages[0];
  const predefined = stages.find(stage => stage.id === id);
  return predefined ? predefined : generateInfiniteStage(id);
}

function generateInfiniteStage(id) {
  const chapter = Math.floor((id - 1) / 8) + 1;
  const step = (id - 1) % 8 + 1;
  const boss = step === 8;
  const chapterName = chapters[Math.min(chapter - 1, chapters.length - 1)][0];
  const power = Math.floor(95 + id * 42 + Math.pow(id, 1.34) * 12 + (boss ? 130 + (chapter - 1) * 55 : 0) + Math.floor(Math.pow(id / 40, 0.5) * 200));
  const gold = 42 + id * 16 + (boss ? 80 : 0) + Math.floor(id / 10) * 10;
  const food = 26 + id * 9 + (boss ? 50 : 0) + Math.floor(id / 10) * 6;
  const shard = boss ? 2 + Math.floor(id / 20) : id % 3 === 0 ? 1 : 0;
  const gem = boss ? 10 + Math.floor(id / 10) * 2 : 0;
  return {
    id,
    chapter: Math.min(chapter, 99),
    name: chapterName + " " + step,
    enemy: boss ? chapterName + "首领" : enemyNames[id % enemyNames.length],
    boss,
    power,
    reward: { gold, food, shard, gem }
  };
}

function load(account) {
  const raw = localStorage.getItem(saveKey(account));
  if (!raw) {
    state.data = null;
    state.screen = "onboarding";
    return;
  }
  state.data = JSON.parse(raw);
  normalizeSave();
  state.screen = "game";
  persist();
}

function normalizeSave() {
  const save = state.data;
  if (!save) return;
  save.version = 2;
  save.accountName ??= state.account || save.name;
  save.name ||= save.accountName || "训练师";
  save.gem ??= 0;
  save.food ??= 0;
  save.protectCard ??= 0;
  save.boostCard ??= 0;
  save.urTicket ??= 0;
  save.firstCharge ??= false;
  save.firstChargeSignDays ??= [];
  save.firstChargeSignDate ??= null;
  save.stamina ??= save.energy ?? 40;
  save.maxStamina ??= save.maxEnergy ?? 40;
  save.clearedStage ??= Math.max(0, (save.unlockedStage || 1) - 1);
  save.farmingStage = clamp(save.farmingStage || Math.max(1, save.clearedStage), 1, Math.max(1, save.clearedStage || 1));
  save.stats ??= {};
  save.stats.wins ??= 0;
  save.stats.losses ??= 0;
  save.stats.summons ??= 0;
  save.stats.equipDraws ??= 0;
  save.stats.idleClaims ??= 0;
  save.stats.sweeps ??= 0;
  save.stats.towerWins ??= 0;
  save.pity ??= 0;
  save.equipPity ??= 0;
  save.dailyDraw ??= { date: currentDateKey(), goldPet: 0 };
  if (save.dailyDraw.date !== currentDateKey()) {
    save.dailyDraw = { date: currentDateKey(), goldPet: 0 };
  }
  save.towerFloor ??= 0;
  save.equipment ??= [];
  save.claimed ??= [];
  save.usedCodes ??= [];
  save.battleRecords ??= [];
  save.chatMessages ??= [];
  save.inbox ??= [];
  save.lastIdleAt ??= Date.now();
  save.lastStaminaAt ??= Date.now();
  save.roster.forEach(pet => {
    pet.uid ??= uid();
    pet.exp ??= 0;
    pet.stars ??= 1;
    pet.gear ??= 0;
    pet.enhance ??= 0;
    pet.copies ??= 0;
  });
  const rosterIds = new Set(save.roster.map(pet => pet.uid));
  save.active = (save.active || []).filter(id => rosterIds.has(id)).slice(0, 5);
  if (save.active.length === 0 && save.roster.length > 0) save.active = [save.roster[0].uid];
}

function persist() {
  if (state.account && state.data) {
    localStorage.setItem(saveKey(state.account), JSON.stringify(state.data));
  }
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function label(key) {
  return ({ gold: "金币", gem: "星钻", ticket: "召唤券", food: "经验果", shard: "星尘", stamina: "体力", exp: "经验", protectCard: "保级卡", boostCard: "幸运卡" })[key] || key;
}

function formatNum(value) {
  return Math.floor(value).toLocaleString("zh-CN");
}

function formatReward(reward) {
  return Object.entries(reward)
    .filter(([, value]) => value)
    .map(([key, value]) => `${label(key)} +${formatNum(value)}`)
    .join("，");
}

function staminaBreakCost() {
  const level = Math.max(0, Math.floor((state.data.maxStamina - 40) / 5));
  return 80 + level * 35;
}

function addLog(text) {
  state.log.unshift(`${new Date().toLocaleTimeString("zh-CN", { hour12: false })} ${text}`);
  state.log = state.log.slice(0, 36);
}

function showToast(title, text = "") {
  const root = document.querySelector("#toastRoot");
  if (!root) return;
  const item = document.createElement("div");
  item.className = "toast";
  item.innerHTML = `<strong>${title}</strong>${text ? `<span>${text}</span>` : ""}`;
  root.appendChild(item);
  setTimeout(() => item.classList.add("show"), 20);
  setTimeout(() => {
    item.classList.remove("show");
    setTimeout(() => item.remove(), 220);
  }, 3200);
}

function openDrawReveal(title, results, type = "pet") {
  state.drawReveal = { title, results, type };
  state.modal = "drawReveal";
}

function addBattleRecord(type, target, win, detail) {
  state.data.battleRecords.unshift({
    time: new Date().toLocaleTimeString("zh-CN", { hour12: false }),
    type,
    target,
    win,
    detail
  });
  state.data.battleRecords = state.data.battleRecords.slice(0, 28);
}

function applyReward(reward) {
  const save = state.data;
  save.gold += reward.gold || 0;
  save.gem += reward.gem || 0;
  save.ticket += reward.ticket || 0;
  save.food += reward.food || 0;
  save.shard += reward.shard || 0;
  save.stamina = Math.min(save.maxStamina, save.stamina + (reward.stamina || 0));
  save.protectCard = (save.protectCard || 0) + (reward.protectCard || 0);
  save.boostCard = (save.boostCard || 0) + (reward.boostCard || 0);
}

function activePets() {
  return state.data.roster.filter(pet => state.data.active.includes(pet.uid));
}

function petPower(pet) {
  return petPowerInSave(pet, state.data);
}

function petPowerInSave(pet, save = state.data) {
  const base = monster(pet.mid);
  const rarity = { N: 0.92, R: 1.02, SR: 1.16, SSR: 1.34, UR: 1.55 }[base.rare];
  const roleBonus = { guard: 1.08, support: 1.02, control: 1.04, strike: 1.08, blast: 1.1 }[base.role];
  const stat = base.hp * 0.34 + base.atk * 3.2 + base.def * 2.15 + base.spd * 1.65;
  const equipBonus = save?.equipment
    ?.filter(item => item.petUid === pet.uid)
    .reduce((sum, item) => sum + equipmentPower(item), 0) || 0;
  const enhanceBonus = (pet.enhance || 0) * (36 + (pet.enhance || 0) * 4);
  return Math.floor((stat + pet.level * 18 + pet.stars * 72 + pet.gear * 20 + enhanceBonus + equipBonus) * rarity * roleBonus);
}

function allPlayerSaves() {
  const saves = [];
  for (let i = 0; i < localStorage.length; i += 1) {
    const key = localStorage.key(i);
    if (!key || !key.startsWith(STORAGE_PREFIX)) continue;
    try {
      const save = JSON.parse(localStorage.getItem(key));
      if (save?.roster?.length) {
        saves.push({ account: key.slice(STORAGE_PREFIX.length), save });
      }
    } catch {
      // Ignore damaged local save data.
    }
  }
  return saves;
}

function petLeaderboard() {
  return allPlayerSaves()
    .flatMap(({ account, save }) => (save.roster || []).map(pet => {
      const base = monster(pet.mid);
      return {
        account,
        playerName: save.name || account || "训练师",
        playerTitle: save.title || "训练师",
        pet,
        base,
        power: petPowerInSave(pet, save),
        isCurrent: account === state.account
      };
    }))
    .sort((a, b) => b.power - a.power);
}

function equipmentPower(item) {
  const def = equipmentDef(item.eid);
  const rare = equipmentRarity[equipmentRareKey(def)] || equipmentRarity.N;
  return rare.power + def.atk * 3 + def.def * 2 + def.hp * 0.35 + item.level * 55;
}

function teamPower() {
  const pets = activePets();
  const base = pets.reduce((sum, pet) => sum + petPower(pet), 0);
  const elementsInTeam = new Set(pets.map(pet => monster(pet.mid).element)).size;
  const roleSpread = new Set(pets.map(pet => monster(pet.mid).role)).size;
  return Math.floor(base * (1 + elementsInTeam * 0.018 + roleSpread * 0.015));
}

const elementCounter = {
  leaf: "water",
  water: "fire",
  fire: "metal",
  metal: "thunder",
  thunder: "light",
  light: "shadow",
  shadow: "leaf"
};

function elementName(key) {
  return elements[key] || key;
}

function stageElement(stage) {
  const chapterElements = ["leaf", "thunder", "water", "fire", "light"];
  return stage.boss ? ["metal", "shadow", "water", "fire", "light"][stage.chapter - 1] || "leaf" : chapterElements[(stage.chapter - 1) % chapterElements.length];
}

function towerElement(floor) {
  const keys = ["leaf", "water", "fire", "metal", "thunder", "light", "shadow"];
  return keys[(floor - 1) % keys.length];
}

function elementAdvantage(targetElement) {
  const pets = activePets();
  if (!pets.length) return { multiplier: 1, text: "无", score: 0 };
  const score = pets.reduce((sum, pet) => {
    const el = monster(pet.mid).element;
    if (elementCounter[el] === targetElement) return sum + 1;
    if (elementCounter[targetElement] === el) return sum - 1;
    return sum;
  }, 0);
  const avg = score / pets.length;
  const multiplier = clamp(1 + avg * 0.18, 0.82, 1.22);
  return {
    multiplier,
    score,
    text: score > 0 ? `克制 +${Math.round((multiplier - 1) * 100)}%` : score < 0 ? `被克制 ${Math.round((multiplier - 1) * 100)}%` : "无明显克制"
  };
}

function battleChance(power, targetElement) {
  const adv = elementAdvantage(targetElement);
  const ratio = teamPower() * adv.multiplier / Math.max(1, power);
  return clamp(Math.round((ratio - 0.72) * 125), 8, 95);
}

function expNeed(level) {
  return 80 + level * 38 + Math.floor(level * level * 1.8);
}

function levelCost(pet) {
  return {
    food: 55 + pet.level * 24,
    gold: 70 + pet.level * 36
  };
}

function starCost(pet) {
  return {
    shard: pet.stars * 10,
    copies: pet.stars
  };
}

function enhanceMax(pet) {
  return enhanceMaxByRare[monster(pet.mid).rare] || 3;
}

function enhanceRate(pet, useBoost = false) {
  const base = monster(pet.mid);
  const rates = enhanceRates[base.rare] || enhanceRates.N;
  const current = pet.enhance || 0;
  return Math.min(95, (rates[current] || rates[rates.length - 1] || 5) + (useBoost ? 15 : 0));
}

function enhanceGuideRows() {
  return Object.entries(enhanceRates).map(([rare, rates]) => ({
    rare,
    max: enhanceMaxByRare[rare],
    rates
  }));
}

function idleRate(stageId = state.data.farmingStage) {
  const stage = stageById(stageId);
  const powerRatio = clamp(teamPower() / Math.max(1, stage.power), 0.35, 2.2);
  const speedBonus = activePets().reduce((sum, pet) => sum + monster(pet.mid).spd, 0) / 1000;
  const baseGold = Math.floor((22 + stage.id * 6) * powerRatio * (1 + speedBonus));
  const baseFood = Math.floor((14 + stage.id * 4) * powerRatio);
  const hasMC = hasMonthCard(state.data.name);
  return {
    gold: hasMC ? Math.floor(baseGold * 1.2) : baseGold,
    food: hasMC ? Math.floor(baseFood * 1.2) : baseFood,
    shard: stage.boss ? 0.18 : stage.id % 5 === 0 ? 0.1 : 0.04
  };
}

function pendingIdle() {
  if (!state.data) return { minutes: 0, capped: false, reward: { gold: 0, food: 0, shard: 0 } };
  const elapsed = Math.max(0, Date.now() - state.data.lastIdleAt);
  const cappedElapsed = Math.min(elapsed, IDLE_CAP_MS);
  const minutes = Math.floor(cappedElapsed / 60000);
  const rate = idleRate();
  return {
    minutes,
    capped: elapsed > IDLE_CAP_MS,
    reward: {
      gold: rate.gold * minutes,
      food: rate.food * minutes,
      shard: Math.floor(rate.shard * minutes)
    }
  };
}

function claimIdle() {
  const idle = pendingIdle();
  if (idle.minutes <= 0) return;
  applyReward(idle.reward);
  state.data.lastIdleAt = Date.now();
  state.data.stats.idleClaims += 1;
  const rewardText = formatReward(idle.reward);
  addLog(`领取 ${idle.minutes} 分钟挂机收益，${rewardText}。`);
  persist();
  render();
  showToast("挂机收益已领取", `${idle.minutes} 分钟 · ${rewardText}`);
}

function recoverStamina() {
  if (!state.data || state.data.stamina >= state.data.maxStamina) return;
  const elapsed = Math.floor((Date.now() - state.data.lastStaminaAt) / (5 * 60000));
  if (elapsed > 0) {
    state.data.stamina = Math.min(state.data.maxStamina, state.data.stamina + elapsed);
    state.data.lastStaminaAt += elapsed * 5 * 60000;
  }
}

function getStaminaRecoveryTime() {
  if (!state.data || state.data.stamina >= state.data.maxStamina) return { remaining: 0, nextAt: 0, seconds: 0, minutes: 0, secondsPart: 0 };
  const interval = 5 * 60000;
  const elapsed = Date.now() - state.data.lastStaminaAt;
  const remaining = Math.max(0, interval - (elapsed % interval));
  return {
    remaining,
    nextAt: Date.now() + remaining,
    seconds: Math.ceil(remaining / 1000),
    minutes: Math.floor(remaining / 60000),
    secondsPart: Math.ceil((remaining % 60000) / 1000)
  };
}

function formatRecoveryTime(seconds) {
  if (seconds <= 0) return "即将恢复";
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  if (mins > 0) return `${mins}分${secs}秒`;
  return `${secs}秒`;
}

function battleScore(stage) {
  const variance = 0.9 + Math.random() * 0.22;
  const roleBonus = activePets().some(pet => monster(pet.mid).role === "support") ? 1.04 : 1;
  return teamPower() * variance * roleBonus * elementAdvantage(stageElement(stage)).multiplier - stage.power;
}

function challenge(stageId, options = {}) {
  const stage = stageById(stageId);
  if (stage.id > state.data.clearedStage + 1) return false;
  if (!options.free) {
    const staminaCost = hasMonthCard(state.data.name) ? 4 : 5;
    if (state.data.stamina < staminaCost) return false;
    state.data.stamina -= staminaCost;
  }
  const win = battleScore(stage) >= 0;
  if (win) {
    applyReward(stage.reward);
    grantTeamExp(Math.floor(stage.reward.food * 0.25));
    state.data.stats.wins += 1;
    if (stage.id > state.data.clearedStage) {
      state.data.clearedStage = stage.id;
      state.data.farmingStage = stage.id;
    }
    const detail = `${elementName(stageElement(stage))}系 · ${elementAdvantage(stageElement(stage)).text} · ${formatReward(stage.reward)}`;
    addLog(`主线 ${stage.name} 胜利，${formatReward(stage.reward)}。`);
    addBattleRecord("主线", `${stage.id}. ${stage.enemy}`, true, detail);
  } else {
    const reward = { gold: Math.floor(stage.reward.gold * 0.18), food: Math.floor(stage.reward.food * 0.22) };
    applyReward(reward);
    grantTeamExp(Math.floor(reward.food * 0.25));
    state.data.stats.losses += 1;
    const detail = `${elementName(stageElement(stage))}系 · ${elementAdvantage(stageElement(stage)).text} · 安慰奖励 ${formatReward(reward)}`;
    addLog(`主线 ${stage.name} 失败，获得安慰奖励 ${formatReward(reward)}。`);
    addBattleRecord("主线", `${stage.id}. ${stage.enemy}`, false, detail);
  }
  persist();
  if (!options.skipRender) render();
  return win;
}

function isAutoCampaignRunning() {
  return Boolean(state.autoCampaignTimer);
}

function stopAutoCampaign(reason = "") {
  if (state.autoCampaignTimer) {
    clearInterval(state.autoCampaignTimer);
    state.autoCampaignTimer = null;
  }
  state.autoCampaignNextAt = 0;
  if (reason) addLog(`自动主线停止：${reason}。`);
  persist();
  render();
}

function runAutoCampaignStep() {
  if (!state.data) {
    stopAutoCampaign();
    return;
  }
  recoverStamina();
  if (state.data.clearedStage > 0 && state.data.clearedStage % 100 === 0) {
    addLog(`🎉 已通关 ${state.data.clearedStage} 关！继续前进！`);
  }
  const staminaCost = hasMonthCard(state.data.name) ? 4 : 5;
  if (state.data.stamina < staminaCost) {
    stopAutoCampaign("体力不足");
    return;
  }
  const next = state.data.clearedStage + 1;
  const ok = challenge(next, { skipRender: true });
  if (!ok) {
    stopAutoCampaign("挑战失败，建议先提升阵容");
    return;
  }
  state.autoCampaignNextAt = Date.now() + AUTO_CAMPAIGN_MS;
  persist();
  render();
}

function toggleAutoCampaign() {
  if (state.autoCampaignTimer) {
    stopAutoCampaign("已手动关闭");
    return;
  }
  const staminaCost = hasMonthCard(state.data.name) ? 4 : 5;
  if (state.data.stamina < staminaCost) {
    addLog("自动主线无法开始：体力不足。");
    render();
    return;
  }
  state.autoCampaignNextAt = Date.now() + AUTO_CAMPAIGN_MS;
  addLog(`自动主线已开启，每 ${Math.round(AUTO_CAMPAIGN_MS / 1000)} 秒挑战 1 关。`);
  state.autoCampaignTimer = setInterval(runAutoCampaignStep, AUTO_CAMPAIGN_MS);
  persist();
  render();
}

function autoTower() {
  let wins = 0;
  for (let i = 0; i < 12; i += 1) {
    const before = state.data.towerFloor;
    towerFight({ skipRender: true });
    if (state.data.towerFloor <= before) break;
    wins += 1;
  }
  addLog(wins > 0 ? `自动试炼塔完成，连续通过 ${wins} 层。` : "自动试炼塔停止：当前层挑战失败。");
  persist();
  render();
}

function sweep() {
  const stage = stageById(state.data.farmingStage);
  const times = Math.min(10, Math.floor(state.data.stamina / 3));
  if (times <= 0) return;
  const rate = idleRate(stage.id);
  const reward = {
    gold: Math.floor(rate.gold * times * 1.8),
    food: Math.floor(rate.food * times * 1.8),
    shard: Math.floor(rate.shard * times)
  };
  state.data.stamina -= times * 3;
  state.data.stats.sweeps += times;
  applyReward(reward);
  grantTeamExp(Math.floor(reward.food * 0.18));
  addLog(`快速扫荡 ${stage.name} ${times} 次，${formatReward(reward)}。`);
  persist();
  render();
}

function setFarmStage(id) {
  state.data.farmingStage = clamp(id, 1, Math.max(1, state.data.clearedStage));
  state.data.lastIdleAt = Date.now();
  addLog(`挂机地点切换到 ${stageById(state.data.farmingStage).name}。`);
  persist();
  render();
}

function grantTeamExp(amount) {
  if (amount <= 0) return;
  const upgrades = [];
  activePets().forEach(pet => {
    pet.exp += amount;
    let count = 0;
    while (pet.exp >= expNeed(pet.level) && pet.level < 80) {
      pet.exp -= expNeed(pet.level);
      pet.level += 1;
      count += 1;
    }
    if (count > 0) {
      upgrades.push(`${monster(pet.mid).name} +${count}级 → ${pet.level}级`);
    }
  });
  if (upgrades.length) {
    addLog(`经验结算：${upgrades.join("、")}。`);
  }
}

function train(uid) {
  const pet = state.data.roster.find(item => item.uid === uid);
  const cost = levelCost(pet);
  if (state.data.food < cost.food || state.data.gold < cost.gold || pet.level >= 80) return;
  state.data.food -= cost.food;
  state.data.gold -= cost.gold;
  pet.level += 1;
  pet.exp = 0;
  addLog(`${monster(pet.mid).name} 强化到 ${pet.level} 级。`);
  persist();
  render();
}

function starUp(uid) {
  const pet = state.data.roster.find(item => item.uid === uid);
  const cost = starCost(pet);
  if (pet.stars >= 6 || state.data.shard < cost.shard || pet.copies < cost.copies) return;
  state.data.shard -= cost.shard;
  pet.copies -= cost.copies;
  pet.stars += 1;
  addLog(`${monster(pet.mid).name} 升到 ${pet.stars} 星。`);
  persist();
  render();
}

function enhancePet(uid, useProtect = false, useBoost = false) {
  const pet = state.data.roster.find(item => item.uid === uid);
  if (!pet) return;
  const base = monster(pet.mid);
  if ((pet.enhance || 0) >= enhanceMax(pet) || pet.copies < 1) return;
  if (useProtect && state.data.protectCard < 1) return;
  if (useBoost && state.data.boostCard < 1) return;
  const before = pet.enhance || 0;
  const rate = enhanceRate(pet, useBoost);
  pet.copies -= 1;
  if (useProtect) state.data.protectCard -= 1;
  if (useBoost) state.data.boostCard -= 1;
  if (Math.random() * 100 < rate) {
    pet.enhance = before + 1;
    addLog(`${base.name} 强化成功，提升到 +${pet.enhance}。`);
  } else {
    const drop = before >= 10 && !useProtect;
    pet.enhance = drop ? Math.max(0, before - 1) : before;
    addLog(`${base.name} 强化失败${drop ? `，等级降到 +${pet.enhance}` : "，等级不变"}。`);
  }
  persist();
  render();
}

function enhancePetWithOptions(uid) {
  const pet = state.data.roster.find(item => item.uid === uid);
  if (!pet) return;
  const useProtect = state.data.protectCard > 0 && confirm(`使用保级卡？失败时不掉级（持有 ${state.data.protectCard} 张）`);
  const useBoost = state.data.boostCard > 0 && confirm(`使用幸运符？成功率+15%（持有 ${state.data.boostCard} 张）`);
  enhancePet(uid, useProtect, useBoost);
}

function openBreakView(uid) {
  state.breakPetUid = uid;
  state.breakResult = null;
  state.breakAnimating = false;
  state.breakUseBoost = false;
  state.breakUseProtect = false;
  state.modal = "breakView";
  render();
}

function closeBreakView() {
  state.breakPetUid = null;
  state.breakResult = null;
  state.breakAnimating = false;
  state.breakUseBoost = false;
  state.breakUseProtect = false;
  state.modal = "";
  render();
}

function executeBreak() {
  const pet = state.data.roster.find(item => item.uid === state.breakPetUid);
  if (!pet) return;
  if ((pet.enhance || 0) >= enhanceMax(pet) || pet.copies < 1) return;

  const useProtect = state.breakUseProtect || false;
  const useBoost = state.breakUseBoost || false;
  if (useProtect && state.data.protectCard < 1) return;
  if (useBoost && state.data.boostCard < 1) return;

  state.breakAnimating = true;
  state.breakResult = null;
  render();

  const finalRate = Math.min(95, enhanceRate(pet) + (useBoost ? 15 : 0));
  const success = Math.random() * 100 < finalRate;
  pet.copies -= 1;
  if (useProtect) state.data.protectCard -= 1;
  if (useBoost) state.data.boostCard -= 1;

  setTimeout(() => {
    if (success) {
      pet.enhance = (pet.enhance || 0) + 1;
      state.breakResult = "success";
      addLog(`${monster(pet.mid).name} 突破成功，提升到 +${pet.enhance}。`);
    } else {
      const before = pet.enhance || 0;
      const drop = before >= 10 && !useProtect;
      pet.enhance = drop ? Math.max(0, before - 1) : before;
      state.breakResult = "fail";
      addLog(`${monster(pet.mid).name} 突破失败${drop ? `，等级降到 +${pet.enhance}` : "，等级不变"}。`);
    }
    persist();
    state.breakAnimating = false;
    render();
    setTimeout(() => render(), 1500);
  }, 800);
}

function rarityRoll(pool = "ticket") {
  state.data.pity += 1;
  if (state.data.pity >= 30) {
    state.data.pity = 0;
    return Math.random() > 0.75 ? "UR" : "SSR";
  }
  const roll = Math.random();
  if (pool === "gold") {
    if (roll > 0.98) return "SSR";
    if (roll > 0.86) return "SR";
    if (roll > 0.48) return "R";
    return "N";
  }
  if (pool === "gem") {
    if (roll > 0.97) return "UR";
    if (roll > 0.84) return "SSR";
    if (roll > 0.52) return "SR";
    if (roll > 0.18) return "R";
    return "N";
  }
  if (roll > 0.985) return "UR";
  if (roll > 0.92) return "SSR";
  if (roll > 0.68) return "SR";
  if (roll > 0.28) return "R";
  return "N";
}

function addMonster(mid) {
  const owned = state.data.roster.find(pet => pet.mid === mid);
  if (owned) {
    owned.copies += 1;
    addLog(`获得重复伙伴 ${monster(mid).name}，转为专属碎片 +1。`);
    return owned;
  }
  const pet = createPet(mid, 1);
  state.data.roster.push(pet);
  return pet;
}

function summon(count = 1) {
  return drawPet("ticket", count);
}

function drawPet(pool = "gem", count = 1) {
  const cost = pool === "gold" ? { gold: 260 * count } : pool === "gem" ? { gem: count === 10 ? 900 : 100 } : { ticket: count };
  if (pool === "gold") {
    const remaining = Math.max(0, 10 - state.data.dailyDraw.goldPet);
    if (count > remaining) return;
  }
  if (Object.entries(cost).some(([key, value]) => state.data[key] < value)) return;
  Object.entries(cost).forEach(([key, value]) => state.data[key] -= value);
  if (pool === "gold") state.data.dailyDraw.goldPet += count;
  const results = [];
  for (let i = 0; i < count; i += 1) {
    const rare = rarityRoll(pool);
    const candidates = monsters.filter(item => item.rare === rare);
    const picked = candidates[Math.floor(Math.random() * candidates.length)] || monsters[0];
    addMonster(picked.id);
    results.push({ name: picked.name, rare: picked.rare, sub: `${elements[picked.element]}系 · ${roles[picked.role]}` });
  }
  state.data.stats.summons += count;
  const title = pool === "gold" ? "金币宠物抽奖" : pool === "gem" ? "钻石宠物抽奖" : "召唤券抽奖";
  addLog(`${title} ${count} 次：${results.slice(0, 5).map(item => `${item.rare}${item.name}`).join("、")}${results.length > 5 ? " 等" : ""}。`);
  persist();
  openDrawReveal(title, results, "pet");
  render();
}

function equipmentRareRoll() {
  state.data.equipPity += 1;
  if (state.data.equipPity >= 20) {
    state.data.equipPity = 0;
    return Math.random() > 0.72 ? "orange" : "purple";
  }
  const roll = Math.random();
  if (roll > 0.94) return Math.random() > 0.55 ? "red" : "orange";
  if (roll > 0.74) return "purple";
  if (roll > 0.42) return "blue";
  return Math.random() > 0.35 ? "green" : "white";
}

function drawEquipment(count = 1) {
  const cost = { gem: count === 10 ? 520 : 60 };
  if (state.data.gem < cost.gem) return;
  state.data.gem -= cost.gem;
  const results = [];
  for (let i = 0; i < count; i += 1) {
    const rare = equipmentRareRoll();
    const slotRand = Math.random() * 100;
    let targetSlot = "武器";
    if (slotRand < SLOT_WEIGHTS["武器"]) targetSlot = "武器";
    else if (slotRand < SLOT_WEIGHTS["武器"] + SLOT_WEIGHTS["衣服"]) targetSlot = "衣服";
    else targetSlot = "光环";
    const pool = equipmentPool.filter(item => item.rare === rare && getEquipSlot(item.id) === targetSlot);
    const fallbackPool = equipmentPool.filter(item => item.rare === rare);
    const pickPool = pool.length ? pool : fallbackPool;
    const picked = pickPool[Math.floor(Math.random() * pickPool.length)] || equipmentPool[0];
    state.data.equipment.push(createEquip(picked.id));
    results.push({ name: picked.name, rare: equipmentRareKey(picked), sub: `${getEquipSlot(picked.id)} · 战力 ${equipmentRarity[equipmentRareKey(picked)].power}` });
  }
  state.data.stats.equipDraws += count;
  addLog(`装备抽奖 ${count} 次：${results.slice(0, 5).map(item => `${item.rare}${item.name}`).join("、")}${results.length > 5 ? " 等" : ""}。`);
  persist();
  openDrawReveal("装备抽奖", results, "equipment");
  render();
}

function setSummonTab(tab) {
  state.summonTab = tab;
  render();
}

function equipItem(petUid, equipUid) {
  const item = state.data.equipment.find(equip => equip.uid === equipUid);
  if (!item) return;
  const slot = getEquipSlot(item.eid);
  if (petUid) {
    const existing = state.data.equipment.find(e => e.petUid === petUid && getEquipSlot(e.eid) === slot && e.uid !== equipUid);
    if (existing) {
      existing.petUid = "";
      addLog(`${equipmentDef(existing.eid).name} 被替换卸下。`);
    }
  }
  item.petUid = item.petUid === petUid ? "" : petUid;
  addLog(`${equipmentDef(item.eid).name}${item.petUid ? "已穿戴" : "已卸下"}。`);
  persist();
  render();
}

function equipItemFromDetail(petUid, equipUid, slot) {
  if (!equipUid) {
    const existing = state.data.equipment.find(e => e.petUid === petUid && getEquipSlot(e.eid) === slot);
    if (existing) {
      existing.petUid = "";
      addLog(`${equipmentDef(existing.eid).name} 已卸下。`);
    }
    persist();
    render();
    return;
  }
  equipItem(petUid, equipUid);
}

function toggleEquipSelect(petUid, slot) {
  const panel = document.getElementById("equipSelectPanel");
  if (!panel) return;
  if (activeEquipSlot === `${petUid}-${slot}`) {
    panel.style.display = "none";
    activeEquipSlot = null;
    return;
  }
  activeEquipSlot = `${petUid}-${slot}`;
  const pet = state.data.roster.find(p => p.uid === petUid);
  if (!pet) return;
  const equipped = petEquipList(petUid);
  const availableEquip = state.data.equipment.filter(e => !e.petUid);
  const current = equipped.find(e => getEquipSlot(e.eid) === slot);
  const avail = availableEquip
    .filter(e => getEquipSlot(e.eid) === slot)
       .sort((a, b) => (equipOrder[equipmentRareKey(equipmentDef(b.eid))] || 0) - (equipOrder[equipmentRareKey(equipmentDef(a.eid))] || 0));
  const slotIcons = { "武器": "🗡️", "衣服": "🛡️", "光环": "✨" };
  panel.innerHTML = `
    <div class="equip-select-content">
      <div class="equip-select-header">
        <span>${slotIcons[slot]} ${slot}</span>
        <button class="equip-select-close" onclick="closeEquipSelect()">×</button>
      </div>
      <div class="equip-select-list">
        ${current ? `
          <button class="equip-option-item current" onclick="equipItemFromDetail('${petUid}', '', '${slot}'); closeEquipSelect();">
            <span class="eq-name">${equipmentDef(current.eid).name}</span>
            <span class="eq-status">✓ 已穿戴</span>
            <span class="eq-action">点击卸下</span>
          </button>
        ` : `<div class="equip-option-empty">当前无装备</div>`}
        ${avail.length ? avail.map(e => {
          const def = equipmentDef(e.eid);
          const rareKey = equipmentRareKey(def);
          return `
            <button class="equip-option-item ${rareKey.toLowerCase()}" onclick="equipItemFromDetail('${petUid}', '${e.uid}', '${slot}'); closeEquipSelect();">
              <span class="eq-rare ${rareKey.toLowerCase()}">${equipmentRarity[rareKey].name}</span>
              <span class="eq-name">${def.name}</span>
              <span class="eq-power">${equipmentPower(e)}</span>
            </button>
          `;
        }).join("") : `<div class="equip-option-empty">无可用装备</div>`}
      </div>
    </div>
  `;
  panel.style.display = "block";
}

function closeEquipSelect() {
  const panel = document.getElementById("equipSelectPanel");
  if (panel) panel.style.display = "none";
  activeEquipSlot = null;
}

function toggleActive(uid) {
  const active = state.data.active;
  if (active.includes(uid)) {
    if (active.length === 1) return;
    state.data.active = active.filter(id => id !== uid);
  } else if (active.length < 5) {
    active.push(uid);
  }
  persist();
  render();
}

function claimTask(id) {
  const task = tasks.find(item => item.id === id);
  if (!task || state.data.claimed.includes(id) || !task.done(state.data)) return;
  state.data.claimed.push(id);
  applyReward(task.reward);
  addLog(`领取任务「${task.title}」，${formatReward(task.reward)}。`);
  persist();
  render();
}

function claimMail(id) {
  const mail = state.data.inbox.find(item => item.id === id);
  if (!mail) return;
  applyReward(mail.reward);
  state.data.inbox = state.data.inbox.filter(item => item.id !== id);
  addLog(`领取邮件「${mail.title}」，${formatReward(mail.reward)}。`);
  persist();
  render();
}

function getFirstChargeRewards() {
  return {
    1: {
      title: "第1天",
      rewards: [
        { label: "UR自选券 ×1", icon: "🌟", key: "urTicket", value: 1 },
        { label: "召唤券 ×10", icon: "✦", key: "ticket", value: 10 }
      ]
    },
    2: {
      title: "第2天",
      rewards: [
        { label: "召唤券 ×5", icon: "✦", key: "ticket", value: 5 },
        { label: "幸运符 ×5", icon: "🍀", key: "boostCard", value: 5 }
      ]
    },
    3: {
      title: "第3天",
      rewards: [
        { label: "召唤券 ×10", icon: "✦", key: "ticket", value: 10 },
        { label: "体力包 ×5（+100体力/个）", icon: "⚡", key: "staminaPack", value: 5 }
      ]
    }
  };
}

function canClaimFirstChargeDay(day) {
  const save = state.data;
  if (!save.firstCharge) return false;
  if (save.firstChargeSignDays.includes(day)) return false;
  if (day > 1 && !save.firstChargeSignDays.includes(day - 1)) return false;
  const today = currentDateKey();
  if (save.firstChargeSignDate === today && save.firstChargeSignDays.length > 0) return false;
  return true;
}

function claimFirstChargeDay(day) {
  const save = state.data;
  if (!canClaimFirstChargeDay(day)) return;
  const rewards = getFirstChargeRewards()[day];
  if (!rewards) return;

  rewards.rewards.forEach(reward => {
    if (reward.key === "staminaPack") {
      save.stamina += reward.value * 100;
    } else {
      save[reward.key] = (save[reward.key] || 0) + reward.value;
    }
  });
  save.firstChargeSignDays.push(day);
  save.firstChargeSignDate = currentDateKey();
  addLog(`领取首充第 ${day} 天奖励。`);

  if (save.urTicket > 0) {
    state.modal = "urSelect";
    addLog("获得 UR 自选券，请选择你的 UR 伙伴。");
  }
  persist();
  render();
}

function selectUrPet(mid) {
  if (!state.data || state.data.urTicket <= 0) return;
  if (monster(mid).rare !== "UR") return;
  state.data.urTicket -= 1;
  addMonster(mid);
  addLog(`UR 自选完成：${monster(mid).name}。`);
  persist();
  closeModal();
}

function towerFight(options = {}) {
  const floor = state.data.towerFloor + 1;
  const power = 260 + floor * 96 + Math.pow(floor, 1.35) * 18;
  const targetElement = towerElement(floor);
  const win = teamPower() * elementAdvantage(targetElement).multiplier * (0.92 + Math.random() * 0.2) >= power;
  if (win) {
    const reward = { gem: 12 + floor * 2, shard: 2 + Math.floor(floor / 3), food: 80 + floor * 16 };
    state.data.towerFloor = floor;
    state.data.stats.towerWins += 1;
    applyReward(reward);
    addLog(`试炼塔第 ${floor} 层胜利，${formatReward(reward)}。`);
    addBattleRecord("试炼塔", `第 ${floor} 层`, true, `${elementName(targetElement)}系 · ${elementAdvantage(targetElement).text} · ${formatReward(reward)}`);
  } else {
    addLog(`试炼塔第 ${floor} 层挑战失败，建议提升前排或辅助。`);
    addBattleRecord("试炼塔", `第 ${floor} 层`, false, `${elementName(targetElement)}系 · ${elementAdvantage(targetElement).text} · 推荐战力 ${formatNum(power)}`);
  }
  persist();
  if (!options.skipRender) render();
}

function buy(item) {
  const offers = {
    ticket: { cost: { gem: 90 }, reward: { ticket: 1 } },
    stamina: { cost: { gem: 50 }, reward: { stamina: 20 }, overflow: true },
    shard: { cost: { gold: 420 }, reward: { shard: 5 } },
    food: { cost: { gold: 360 }, reward: { food: 500 } },
    protectCard: { cost: { gem: 120 }, reward: { protectCard: 1 } },
    boostCard: { cost: { gem: 80 }, reward: { boostCard: 1 } }
  };
  if (item === "staminaCap") {
    if (state.data.maxStamina >= STAMINA_CAP_LIMIT) {
      addLog("体力上限已达到当前版本最高值。");
      render();
      return;
    }
    const cost = staminaBreakCost();
    if (state.data.gem < cost) return;
    state.data.gem -= cost;
    state.data.maxStamina += 5;
    state.data.stamina = Math.min(state.data.maxStamina, state.data.stamina + 5);
    addLog(`体力上限突破成功，上限提升到 ${state.data.maxStamina}。`);
    persist();
    render();
    return;
  }
  const offer = offers[item];
  if (!offer) return;
  if (Object.entries(offer.cost).some(([key, value]) => state.data[key] < value)) return;
  Object.entries(offer.cost).forEach(([key, value]) => state.data[key] -= value);
  if (offer.overflow) {
    state.data.stamina += offer.reward.stamina || 0;
  } else {
    applyReward(offer.reward);
  }
  addLog(`商店购买成功，${formatReward(offer.reward)}。`);
  persist();
  render();
}

function resetSave() {
  if (!state.account) return;
  if (!confirm("确定重置当前试玩账号？这个操作只影响本地浏览器存档。")) return;
  const name = state.account;
  localStorage.removeItem(saveKey(name));
  load(name);
  addLog("当前账号存档已重置。");
  render();
}

function toggleAdminPanel() {
  const pw = prompt("请输入管理员密码：");
  if (pw === "admin123") {
    adminPanelVisible = !adminPanelVisible;
    render();
    return;
  }
  alert("密码错误！");
}

function adminActivateByName() {
  const name = document.getElementById("adminPlayerName")?.value?.trim();
  if (!name) {
    alert("请输入玩家游戏名字！");
    return;
  }
  if (!confirm(`确认给 "${name}" 激活月卡（30天）？`)) return;

  const players = getMonthCardPlayers();
  const now = Date.now();
  players[name] = {
    activatedAt: now,
    expiresAt: now + 30 * 24 * 60 * 60 * 1000,
    firstCharge: true
  };
  saveMonthCardPlayers(players);

  if (state.data && state.data.name === name) {
    state.data.firstCharge = true;
    addLog("月卡已激活。");
    persist();
    render();
  }
  alert(`"${name}" 的月卡已激活！`);
}

function adminAdd30Days() {
  const name = document.getElementById("adminPlayerName")?.value?.trim();
  if (!name) {
    alert("请输入玩家游戏名字！");
    return;
  }
  const players = getMonthCardPlayers();
  if (!players[name]) {
    alert("该玩家没有月卡！");
    return;
  }
  players[name].expiresAt += 30 * 24 * 60 * 60 * 1000;
  saveMonthCardPlayers(players);
  alert(`"${name}" 已续费30天！`);
  render();
}

function adminRemoveMonthCard() {
  const name = document.getElementById("adminPlayerName")?.value?.trim();
  if (!name) {
    alert("请输入玩家游戏名字！");
    return;
  }
  if (!confirm(`确认移除 "${name}" 的月卡？`)) return;
  const players = getMonthCardPlayers();
  delete players[name];
  saveMonthCardPlayers(players);
  alert(`"${name}" 的月卡已移除！`);
  render();
}

function escapeHtml(text) {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}

function chatMessageMarkup(msg) {
  return `
    <div class="chat-message ${msg.isMonthCard ? "month-card" : ""}">
      <span class="chat-player ${msg.isMonthCard ? "vip" : ""}">
        ${msg.isMonthCard ? "👑 " : ""}${escapeHtml(msg.player)}
      </span>
      <span class="chat-text">${escapeHtml(msg.message)}</span>
      <span class="chat-time">${new Date(msg.time).toLocaleTimeString()}</span>
    </div>
  `;
}

function sendChatMessage() {
  const input = document.getElementById("chatInput");
  const msg = input?.value?.trim();
  if (!msg) return;
  if (msg.length > 200) {
    alert("消息太长，最多200字！");
    return;
  }

  state.data.chatMessages.unshift({
    player: state.data.name,
    message: msg,
    time: Date.now(),
    isMonthCard: hasMonthCard(state.data.name)
  });
  state.data.chatMessages = state.data.chatMessages.slice(0, 100);
  input.value = "";
  persist();
  renderChat();
}

function renderChat() {
  const container = document.getElementById("chatContainer");
  if (!container) return;
  const messages = state.data?.chatMessages || [];
  container.innerHTML = messages.map(chatMessageMarkup).join("");
}

function setAuthMode(mode) {
  state.authMode = mode;
  render();
}

function readInput(id) {
  return document.querySelector(`#${id}`)?.value.trim() || "";
}

function registerAccount() {
  const account = readInput("authAccount");
  const password = readInput("authPassword");
  const confirm = readInput("authConfirm");
  if (!/^[A-Za-z0-9_@.-]{3,32}$/.test(account)) {
    alert("登录用户名需为英文、数字或邮箱符号，3-32 位。");
    return;
  }
  if (password.length < 4) {
    alert("密码至少 4 位。");
    return;
  }
  if (password !== confirm) {
    alert("两次密码不一致。");
    return;
  }
  if (readAccount(account) || hasGameSave(account)) {
    alert("账号已存在，请直接登录。");
    return;
  }
  writeAccount(account, { account, password, createdAt: Date.now() });
  state.account = account;
  state.data = null;
  state.screen = "onboarding";
  localStorage.setItem(LAST_ACCOUNT_KEY, account);
  addLog("账号创建成功，请创建游戏角色。");
  render();
}

function loginAccount() {
  const account = readInput("authAccount");
  const password = readInput("authPassword");
  const record = readAccount(account);
  if (!record && !hasGameSave(account)) {
    alert("账号不存在，请先注册。");
    return;
  }
  if (record && record.password !== password) {
    alert("密码不正确。");
    return;
  }
  state.account = account;
  localStorage.setItem(LAST_ACCOUNT_KEY, account);
  load(account);
  addLog(state.data ? "读取本地角色存档成功。" : "登录成功，请创建游戏角色。");
  render();
}

function createCharacter() {
  const playerName = readInput("playerName");
  const starter = document.querySelector("#starterSelect")?.value || "sprout";
  if (!/^[\u4e00-\u9fa5A-Za-z0-9_]{2,16}$/.test(playerName)) {
    alert("游戏名字需为中文、英文、数字或下划线，2-16 位。");
    return;
  }
  if (!state.account) return;
  state.data = defaultSave(state.account, playerName, starter);
  state.screen = "game";
  state.view = "home";
  addLog(`角色创建成功，初始宝宝：${monster(starter).name}。`);
  persist();
  render();
}

function logout() {
  if (state.autoCampaignTimer) {
    clearInterval(state.autoCampaignTimer);
    state.autoCampaignTimer = null;
    state.autoCampaignNextAt = 0;
  }
  state.account = "";
  state.data = null;
  state.log = [];
  state.screen = "auth";
  state.authMode = "login";
  state.accountMenu = false;
  state.modal = "";
  localStorage.removeItem(LAST_ACCOUNT_KEY);
  render();
}

function toggleAccountMenu() {
  state.accountMenu = !state.accountMenu;
  renderAccount();
}

function openModal(name) {
  state.modal = name;
  state.accountMenu = false;
  render();
}

function closeModal() {
  state.modal = "";
  state.selectedPetUid = null;
  state.breakPetUid = null;
  state.drawReveal = null;
  state.breakAnimating = false;
  state.breakResult = null;
  render();
}

function openPetDetail(uid) {
  state.selectedPetUid = uid;
  state.modal = "petDetail";
  render();
}

function closePetDetail() {
  state.selectedPetUid = null;
  state.modal = "";
  render();
}

function playerId() {
  const source = state.account || state.data?.name || "player";
  let hash = 0;
  for (let i = 0; i < source.length; i += 1) hash = (hash * 31 + source.charCodeAt(i)) % 9000;
  return 1000 + hash;
}

function trainerLevel() {
  return 1 + Math.floor(state.data.clearedStage / 4) + Math.floor(state.data.stats.wins / 25);
}

function growthLevel() {
  const totalLevel = state.data.roster.reduce((sum, pet) => sum + pet.level + pet.stars * 2, 0);
  return Math.max(1, Math.floor(totalLevel / 8));
}

function renamePlayer() {
  const next = readInput("renameInput");
  const cost = 80;
  if (!/^[\u4e00-\u9fa5A-Za-z0-9_]{2,16}$/.test(next)) {
    alert("新名字需为中文、英文、数字或下划线，2-16 位。");
    return;
  }
  if (next === state.data.name) {
    alert("新名字和当前名字相同。");
    return;
  }
  if (state.data.gem < cost) {
    alert(`钻石不足，改名需要 ${cost} 钻石。`);
    return;
  }
  state.data.gem -= cost;
  state.data.name = next;
  addLog(`角色改名成功，消耗钻石 ${cost}。`);
  persist();
  render();
}

function renamePet(uid) {
  const pet = state.data.roster.find(item => item.uid === uid);
  const next = readInput(`petRename-${uid}`);
  const cost = 30;
  if (!pet) return;
  if (!/^[\u4e00-\u9fa5A-Za-z0-9_]{2,12}$/.test(next)) {
    alert("伙伴名字需为中文、英文、数字或下划线，2-12 位。");
    return;
  }
  if (state.data.gem < cost) {
    alert(`钻石不足，伙伴改名需要 ${cost} 钻石。`);
    return;
  }
  state.data.gem -= cost;
  pet.nickname = next;
  addLog(`${monster(pet.mid).name} 改名为 ${next}，消耗钻石 ${cost}。`);
  persist();
  render();
  showToast("伙伴改名成功", `${next} · 钻石 -${cost}`);
}

function claimPetRankRewards() {
  const today = currentDateKey();
  if (state.data.petRankRewardDate === today) return;
  const rewards = [
    { gem: 80, title: "冠军伙伴" },
    { gem: 50, title: "精英伙伴" },
    { gem: 30, title: "新星伙伴" }
  ];
  const ranking = petLeaderboard().slice(0, 3);
  if (!ranking.length) return;
  let totalGem = 0;
  ranking.forEach((row, index) => {
    if (row.account !== state.account) return;
    const reward = rewards[index];
    const pet = state.data.roster.find(item => item.uid === row.pet.uid);
    if (!pet) return;
    pet.rankTitle = reward.title;
    totalGem += reward.gem;
  });
  if (totalGem <= 0) {
    state.data.petRankRewardDate = today;
    addLog("今日伙伴战力榜前三名暂无你的伙伴，未获得排行奖励。");
    persist();
    render();
    showToast("未获得排行奖励", "今日前三名暂无你的伙伴");
    return;
  }
  state.data.gem += totalGem;
  state.data.petRankRewardDate = today;
  addLog(`领取伙伴战力榜奖励，钻石 +${totalGem}，前三名获得称号。`);
  persist();
  render();
  showToast("排行榜奖励已领取", `钻石 +${totalGem} · 前三名获得称号`);
}

function changePassword() {
  const oldPassword = readInput("oldPassword");
  const next = readInput("newPassword");
  const confirm = readInput("confirmPassword");
  const record = readAccount(state.account);
  if (record?.password && record.password !== oldPassword) {
    alert("当前密码不正确。");
    return;
  }
  if (next.length < 4) {
    alert("新密码至少 4 位。");
    return;
  }
  if (next !== confirm) {
    alert("两次新密码不一致。");
    return;
  }
  writeAccount(state.account, { ...(record || { account: state.account, createdAt: Date.now() }), password: next, updatedAt: Date.now() });
  addLog("登录密码已修改。");
  closeModal();
}

function redeemCode() {
  const code = readInput("redeemInput").toUpperCase();
  const codes = {
    START100: { gem: 100, gold: 500 },
    PET2026: { ticket: 3, food: 600 },
    GEM666: { gem: 180, shard: 20 }
  };
  const reward = codes[code];
  if (!reward) {
    alert("兑换码无效。");
    return;
  }
  if (state.data.usedCodes.includes(code)) {
    alert("这个兑换码已经使用过。");
    return;
  }
  state.data.usedCodes.push(code);
  applyReward(reward);
  addLog(`兑换码 ${code} 使用成功，${formatReward(reward)}。`);
  persist();
  closeModal();
}

function rechargeDiamonds(amount, label) {
  state.data.gem += amount;
  if (!state.data.firstCharge) {
    state.data.firstCharge = true;
    addLog("首充福利已开启，可在大厅领取 3 日签到奖励。");
  }
  addLog(`充值模拟：${label}，钻石 +${amount}。`);
  persist();
  closeModal();
}

function renderAccount() {
  const el = document.querySelector("#accountPanel");
  if (state.screen === "auth") {
    el.innerHTML = "";
    return;
  }
  const menu = `
    <div class="account-menu">
      ${state.data ? `<button onclick="openModal('profile')"><i class="blue">人</i><span>我的资料卡</span></button>` : ""}
      <button onclick="openModal('password')"><i class="brown">钥</i><span>修改密码</span></button>
      ${state.data ? `<button onclick="openModal('redeem')"><i class="green">礼</i><span>兑换码</span></button>` : ""}
      <button onclick="logout()"><i class="red">出</i><span>退出登录</span></button>
    </div>
  `;
  if (state.screen === "onboarding") {
    el.innerHTML = `
      <div class="account-wrap">
        <button class="player-profile" title="${state.account}｜账号已登录" onclick="toggleAccountMenu()">
          <div class="avatar">${state.account.slice(0, 1).toUpperCase()}</div>
          <div class="player-copy">
            <strong>${state.account}</strong>
            <span>待创建角色</span>
          </div>
          <span class="menu-caret">⌄</span>
        </button>
        ${state.accountMenu ? menu : ""}
      </div>
    `;
    return;
  }
  const initial = (state.data.name || state.account || "玩").slice(0, 1).toUpperCase();
  const vip = hasMonthCard(state.data.name);
  el.innerHTML = `
    <div class="account-wrap">
      <button class="player-profile" title="${state.data.name}｜${state.account}｜${state.data.title}｜战力 ${formatNum(teamPower())}" onclick="toggleAccountMenu()">
        <div class="avatar">${initial}</div>
        <div class="player-copy account-copy">
          <span class="account-line"><strong class="${vip ? "vip-name" : ""}">${state.data.name}</strong>${vip ? '<span class="month-card-badge">👑</span>' : ""}<em>| ${state.data.title} | 战力 ${formatNum(teamPower())}</em></span>
        </div>
        <span class="menu-caret">⌄</span>
      </button>
      ${state.accountMenu ? menu : ""}
    </div>
  `;
}

function renderNav() {
  const nav = document.querySelector("#nav");
  if (state.screen !== "game") {
    nav.innerHTML = "";
    return;
  }
  nav.innerHTML = navItems
    .map(([id, text]) => `
      <button class="nav-text ${state.view === id ? "active" : ""}" onclick="state.view='${id}';render()">
        <span>${text}</span>
      </button>
    `)
    .join("");
}

function renderResources() {
  const el = document.querySelector("#resources");
  if (state.screen !== "game" || !state.data) {
    el.innerHTML = "";
    return;
  }
  const rows = [
    ["gold", state.data.gold],
    ["gem", state.data.gem],
    ["stamina", `${state.data.stamina}/${state.data.maxStamina}`],
    ["ticket", state.data.ticket]
  ];
  el.innerHTML = rows.map(([key, value]) => {
    const [name, icon, note] = resourceMeta[key];
    const display = typeof value === "number" ? formatNum(value) : value;
    return `
      <div class="resource compact-tip" tabindex="0" aria-label="${name} ${display}。${note}" title="${name}：${note}" data-tip="${name}｜${note}">
        <i aria-hidden="true">${icon}</i>
        <span>${name}</span>
        <strong>${display}</strong>
        ${key === "stamina" ? state.data.stamina < state.data.maxStamina
          ? `<span class="recovery-timer">${formatRecoveryTime(getStaminaRecoveryTime().seconds)}</span>`
          : `<span class="recovery-timer full">已满</span>` : ""}
        ${key === "gem" ? `<button class="recharge-chip" onclick="openModal('recharge')" title="充值钻石">充值</button>` : ""}
      </div>
    `;
  }).join("");
}

function renderLog() {
  if (state.screen !== "game") {
    document.querySelector("#battleLog").innerHTML = "";
    return;
  }
  const systemNote = `
    <div class="system-note">
      <strong>系统说明</strong>
      <p>核心循环是挂机收益、刷图解锁、召唤扩充阵容、养成后继续推图。角色、数值、关卡和文案均为原创占位。</p>
    </div>
  `;
  document.querySelector("#battleLog").innerHTML = state.log.length
    ? `${systemNote}${state.log.map(item => `<div>${item}</div>`).join("")}`
    : `${systemNote}<p class="empty">挂机、推图和养成记录会显示在这里。</p>`;
}

function renderModal() {
  const el = document.querySelector("#modalRoot");
  if (!el) return;
  if (!state.modal || state.screen !== "game" || !state.data) {
    el.innerHTML = "";
    return;
  }
  const close = `<button class="modal-close" onclick="closeModal()" aria-label="关闭">×</button>`;
  const achievementDone = state.data.claimed.length;
  const achievementTotal = tasks.length;
  const dexOwned = new Set(state.data.roster.map(pet => pet.mid)).size;
  const dexTotal = monsters.length;
  const achievementPct = Math.round(achievementDone / achievementTotal * 100);
  const dexPct = Math.round(dexOwned / dexTotal * 100);
  const activeShowcase = activePets().map(pet => {
    const base = monster(pet.mid);
    return `<span class="showcase-pet ${base.rare.toLowerCase()}"><i>${base.rare}</i>${petDisplayName(pet)}</span>`;
  }).join("") || `<span class="empty">暂无上阵伙伴</span>`;
  const content = {
    profile: `
      <section class="modal-card profile-modal">
        ${close}
        <div class="modal-head">
          <div>
            <h2>角色资料</h2>
            <p>玩家 #${playerId()}</p>
          </div>
        </div>
        <div class="profile-grid">
          <section class="profile-portrait">
            <div class="portrait-icon">人</div>
            <p>暂无形象</p>
          </section>
          <section class="profile-info">
            <div class="profile-name-line">
              <h3>${state.data.name}</h3>
              <span>单机模式</span>
            </div>
            <div class="profile-stats">
              <div><span>训练师等级</span><strong>Lv.${trainerLevel()}</strong></div>
              <div><span>远征等级</span><strong>Lv.${Math.max(1, Math.ceil(state.data.clearedStage / 5))}</strong></div>
              <div><span>养成等级</span><strong>Lv.${growthLevel()}</strong></div>
            </div>
            <div class="profile-progress-grid">
              <div class="progress-card">
                <div><strong>成就进度</strong><span>${achievementDone}/${achievementTotal}</span></div>
                <b><i style="width:${achievementPct}%"></i></b>
              </div>
              <div class="progress-card">
                <div><strong>伙伴图鉴</strong><span>${dexOwned}/${dexTotal}</span></div>
                <b><i style="width:${dexPct}%"></i></b>
              </div>
            </div>
            <div class="showcase-card">
              <div><strong>伙伴展柜</strong><span>战力 ${formatNum(teamPower())}</span></div>
              <div class="showcase-list">${activeShowcase}</div>
            </div>
            <div class="rename-card">
              <strong>修改名字</strong>
              <p>改名消耗 80 钻石。</p>
              <div class="form-row">
                <input id="renameInput" maxlength="16" value="${state.data.name}" placeholder="输入新名字">
                <button class="primary" onclick="renamePlayer()" ${state.data.gem < 80 ? "disabled" : ""}>改名</button>
              </div>
            </div>
          </section>
        </div>
      </section>
    `,
    password: `
      <section class="modal-card narrow-modal">
        ${close}
        <div class="modal-head"><div><h2>修改密码</h2><p>修改后下次登录使用新密码。本地原型不会联网提交。</p></div></div>
        <label><span>当前密码</span><input id="oldPassword" type="password" autocomplete="current-password" placeholder="请输入当前密码"></label>
        <label><span>新密码</span><input id="newPassword" type="password" autocomplete="new-password" placeholder="至少 4 位"></label>
        <label><span>确认新密码</span><input id="confirmPassword" type="password" autocomplete="new-password" placeholder="再次输入新密码"></label>
        <button class="primary full-button" onclick="changePassword()">确认修改</button>
      </section>
    `,
    redeem: `
      <section class="modal-card narrow-modal">
        ${close}
        <div class="modal-head"><div><h2>兑换码</h2><p>输入活动码领取本地试玩奖励。可试：START100、PET2026、GEM666。</p></div></div>
        <label><span>兑换码</span><input id="redeemInput" placeholder="请输入兑换码"></label>
        <button class="primary full-button" onclick="redeemCode()">立即兑换</button>
      </section>
    `,
    drawReveal: `
      <section class="modal-card draw-reveal-modal">
        ${close}
        <div class="modal-head"><div><h2>${state.drawReveal?.title || "抽奖结果"}</h2><p>点击关闭后结果会保留在战报里。</p></div></div>
        <div class="flip-card-grid">
          ${(state.drawReveal?.results || []).map((item, index) => `
            <article class="flip-card ${String(item.rare || "n").toLowerCase()}" style="animation-delay:${Math.min(index, 9) * 70}ms">
              <div class="flip-inner">
                <div class="flip-front">?</div>
                <div class="flip-back">
                  <i>${item.rare}</i>
                  <strong>${item.name}</strong>
                  <span>${item.sub || ""}</span>
                </div>
              </div>
            </article>
          `).join("")}
        </div>
        <button class="primary full-button" onclick="closeModal()">收下</button>
      </section>
    `,
    recharge: `
      <section class="modal-card narrow-modal">
        ${close}
        <div class="modal-head"><div><h2>钻石充值</h2><p>当前为本地原型模拟充值，不包含真实支付。</p></div></div>
        <div class="qr-placeholder">
          <img src="qrcode.png" alt="微信收款码" class="qr-image">
          <p class="qr-hint">扫码支付 30 元，备注游戏名字</p>
        </div>
        <div class="month-card-details">
          <h4>📋 月卡福利清单</h4>
          <div class="detail-list">
            <div class="detail-item"><span>💎 立即到账</span><b>300 钻石</b></div>
            <div class="detail-item"><span>📦 每日福利</span><b>钻石+20 / 体力+15 / 召唤券+1</b></div>
            <div class="detail-item"><span>⚡ 体力上限</span><b>+20（月卡期间）</b></div>
            <div class="detail-item"><span>🎯 自动主线</span><b>体力消耗 -1（每次4点）</b></div>
            <div class="detail-item"><span>⏱️ 挂机收益</span><b>+20%</b></div>
            <div class="detail-item highlight"><span>🎁 首充额外</span><b>UR自选券 ×1</b></div>
          </div>
        </div>
        <div class="recharge-grid">
          <button onclick="rechargeDiamonds(120, '月光小包')"><strong>120 钻石</strong><span>月光小包</span></button>
          <button onclick="rechargeDiamonds(680, '星辉礼包')"><strong>680 钻石</strong><span>星辉礼包</span></button>
          <button onclick="rechargeDiamonds(1980, '远征补给')"><strong>1,980 钻石</strong><span>远征补给</span></button>
        </div>
      </section>
    `,
    urSelect: `
      <section class="modal-card guide-modal">
        ${close}
        <div class="modal-head"><div><h2>UR 自选券</h2><p>选择 1 名 UR 伙伴加入阵容。重复选择会转为该伙伴碎片。</p></div></div>
        <div class="grid two">
          ${monsters.filter(item => item.rare === "UR").map(item => `
            <article class="card ${rarityBorderClass(item.rare)}">
              <div class="pet-title">
                <div><strong>${item.name}</strong><span>${elements[item.element]}系 · ${roles[item.role]}</span></div>
                <i class="${rarityClass(item.rare)}">${item.rare}</i>
              </div>
              <p>${item.skill}</p>
              <div class="mini-stats"><span>HP ${item.hp}</span><span>攻 ${item.atk}</span><span>防 ${item.def}</span><span>速 ${item.spd}</span></div>
              <button class="primary full-button" onclick="selectUrPet('${item.id}')">选择</button>
            </article>
          `).join("")}
        </div>
      </section>
    `,
    petDetail: `
      <section class="modal-card pet-detail-modal">
        ${close}
        ${(function() {
          const pet = state.data.roster.find(p => p.uid === state.selectedPetUid);
          if (!pet) return `<p>伙伴不存在</p>`;
          const base = monster(pet.mid);
          const cost = levelCost(pet);
          const scost = starCost(pet);
          const need = expNeed(pet.level);
          const equipped = petEquipList(pet.uid);
          const maxEnhance = enhanceMax(pet);
          const rate = enhanceRate(pet);
          const enhanceDone = (pet.enhance || 0) >= maxEnhance;
          const weapon = equipped.find(e => getEquipSlot(e.eid) === "武器");
          const armor = equipped.find(e => getEquipSlot(e.eid) === "衣服");
          const aura = equipped.find(e => getEquipSlot(e.eid) === "光环");
          const availableEquip = state.data.equipment.filter(e => !e.petUid);
          return `
            <div class="pet-detail-header">
              <div class="pet-detail-name">
                <h2>${petDisplayName(pet)}</h2>
                <span class="star-display">${renderStars(pet.stars)}</span>
                <span class="pet-detail-rare ${base.rare.toLowerCase()}">${base.rare}</span>
              </div>
              <div class="pet-detail-meta">
                <span>${elements[base.element]}系 · ${roles[base.role]}</span>
                <span>${base.skill}</span>
              </div>
            </div>
            <div class="pet-detail-body">
              <div class="detail-stats-row">
                <div class="detail-stat">
                  <label>等级</label>
                  <b>${pet.level} / 80</b>
                  <div class="bar"><i style="width
                  :${Math.min(100, pet.exp / need * 100)}%"></i></div>
                </div>
                <div class="detail-stat">
                  <label>战力</label>
                  <b>${formatNum(petPower(pet))}</b>
                </div>
                <div class="detail-stat">
                  <label>碎片</label>
                  <b>×${pet.copies}</b>
                </div>
              </div>
              <div class="detail-break-row">
                <span>突破 +${pet.enhance || 0} / ${maxEnhance}</span>
                <span class="break-rate">成功率 ${rate}%</span>
                <span class="break-resources">重复宠物 ×${pet.copies}</span>
              </div>
              <div class="pet-rename-row">
                <input id="petRename-${pet.uid}" maxlength="12" value="${petDisplayName(pet)}" placeholder="伙伴新名字">
                <button onclick="renamePet('${pet.uid}')" ${state.data.gem < 30 ? "disabled" : ""}>改名 30钻</button>
              </div>
              <div class="detail-equip-row">
                <div class="equip-slot-compact" onclick="toggleEquipSelect('${pet.uid}', '武器')">
                  <span class="equip-icon">🗡️</span>
                  <span class="equip-name ${weapon ? "has" : "empty"}">${weapon ? equipmentDef(weapon.eid).name : "空"}</span>
                  <span class="equip-arrow">▼</span>
                </div>
                <div class="equip-slot-compact" onclick="toggleEquipSelect('${pet.uid}', '衣服')">
                  <span class="equip-icon">🛡️</span>
                  <span class="equip-name ${armor ? "has" : "empty"}">${armor ? equipmentDef(armor.eid).name : "空"}</span>
                  <span class="equip-arrow">▼</span>
                </div>
                <div class="equip-slot-compact" onclick="toggleEquipSelect('${pet.uid}', '光环')">
                  <span class="equip-icon">✨</span>
                  <span class="equip-name ${aura ? "has" : "empty"}">${aura ? equipmentDef(aura.eid).name : "空"}</span>
                  <span class="equip-arrow">▼</span>
                </div>
              </div>
              <div id="equipSelectPanel" class="equip-select-panel" style="display:none;"></div>
              <div class="detail-actions-row">
                <button class="action-btn primary" onclick="train('${pet.uid}')" ${state.data.food < cost.food || state.data.gold < cost.gold || pet.level >= 80 ? "disabled" : ""}>
                  升级 <span class="cost">${formatNum(cost.food)}果/${formatNum(cost.gold)}金</span>
                </button>
                <button class="action-btn" onclick="starUp('${pet.uid}')" ${pet.stars >= 6 || state.data.shard < scost.shard || pet.copies < scost.copies ? "disabled" : ""}>
                  升星 <span class="cost">${scost.copies}碎片/${scost.shard}星尘</span>
                </button>
                <div class="break-group">
                  <button class="action-btn break-main" onclick="openBreakView('${pet.uid}')" ${enhanceDone || pet.copies < 1 ? "disabled" : ""}>突破 ${rate}%</button>
                </div>
              </div>
              <div class="detail-legend">
                <span>💡 升星=星尘+碎片</span>
                <span>🔁 突破=重复宠物</span>
                <span>🛡️ 保级防掉级</span>
                <span>🍀 幸运+15%</span>
              </div>
            </div>
          `;
        })()}
      </section>
    `,
    breakView: `
      <section class="modal-card break-modal">
        ${close}
        ${(function() {
          const pet = state.data.roster.find(item => item.uid === state.breakPetUid);
          if (!pet) return "<p>伙伴不存在</p>";
          const base = monster(pet.mid);
          const maxEnhance = enhanceMax(pet);
          const currentEnhance = pet.enhance || 0;
          const isMax = currentEnhance >= maxEnhance;
          const baseRate = enhanceRate(pet);
          const hasBoost = state.data.boostCard > 0;
          const hasProtect = state.data.protectCard > 0;
          const useBoost = state.breakUseBoost || false;
          const useProtect = state.breakUseProtect || false;
          const finalRate = Math.min(95, baseRate + (useBoost ? 15 : 0));
          const canBreak = !isMax && pet.copies >= 1;
          return `
            <div class="break-header">
              <div class="break-pet-info">
                <h2>${base.name}</h2>
                <span class="break-rare ${base.rare.toLowerCase()}">${base.rare}</span>
                <span>当前突破 +${currentEnhance} / ${maxEnhance}</span>
              </div>
              <div class="break-copies">重复宠物 ×${pet.copies}</div>
            </div>
            <div class="break-body">
              <div class="break-visual ${state.breakAnimating ? "animating" : ""} ${state.breakResult || ""}">
                <div class="break-number">+${currentEnhance}</div>
                ${state.breakResult === "success" ? `<div class="break-flash success-flash">✨</div>` : ""}
                ${state.breakResult === "fail" ? `<div class="break-flash fail-flash">💥</div>` : ""}
                <div class="break-status-text">
                  ${state.breakResult === "success" ? "突破成功！" : ""}
                  ${state.breakResult === "fail" ? "突破失败" : ""}
                </div>
              </div>
              <div class="break-controls">
                <div class="break-rate-display">
                  <span>成功率</span>
                  <strong style="color: ${finalRate >= 70 ? "#22c55e" : finalRate >= 40 ? "#f59e0b" : "#ef4444"}">${finalRate}%</strong>
                </div>
                <div class="break-toggle-row">
                  <label class="toggle-label ${hasProtect && canBreak ? "" : "disabled"}">
                    <input type="checkbox" ${useProtect ? "checked" : ""} onchange="state.breakUseProtect=this.checked;render()" ${!hasProtect || !canBreak ? "disabled" : ""}>
                    🛡️ 使用保级卡（${state.data.protectCard}张）
                    <span class="toggle-hint">失败不掉级</span>
                  </label>
                </div>
                <div class="break-toggle-row">
                  <label class="toggle-label ${hasBoost && canBreak ? "" : "disabled"}">
                    <input type="checkbox" ${useBoost ? "checked" : ""} onchange="state.breakUseBoost=this.checked;render()" ${!hasBoost || !canBreak ? "disabled" : ""}>
                    🍀 使用幸运符（${state.data.boostCard}张）
                    <span class="toggle-hint">成功率 +15%</span>
                  </label>
                </div>
              </div>
              <div class="break-actions">
                <button class="break-btn primary" onclick="executeBreak()" ${!canBreak || state.breakAnimating ? "disabled" : ""}>${isMax ? "已满级" : "突破"}</button>
                <button class="break-btn" onclick="closeBreakView()">取消</button>
              </div>
              ${!canBreak && !isMax ? `<div class="break-warning">重复宠物不足，需要至少 1 只同名宠物。</div>` : ""}
              ${isMax ? `<div class="break-warning success">已到达最高突破等级。</div>` : ""}
            </div>
          `;
        })()}
      </section>
    `,
    enhanceGuide: `
      <section class="modal-card guide-modal">
        ${close}
        <div class="modal-head"><div><h2>强化指南</h2><p>每次强化消耗 1 个重复宠物。幸运卡成功率 +15%，最高显示 95%。+10 之后失败可能 -1，保级卡可防止掉级。</p></div></div>
        <div class="guide-grid">
          ${enhanceGuideRows().map(row => `
            <article class="guide-card ${rarityBorderClass(row.rare)}">
              <div class="guide-title"><i class="${rarityClass(row.rare)}">${row.rare}</i><strong>最高 +${row.max}</strong></div>
              <div class="guide-rates">
                ${row.rates.map((rate, index) => `<span>+${index} → ${index + 1}<b>${rate}%</b></span>`).join("")}
              </div>
            </article>
          `).join("")}
        </div>
      </section>
    `
  };
  el.innerHTML = `<div class="modal-backdrop" onclick="closeModal()"><div onclick="event.stopPropagation()">${content[state.modal] || ""}</div></div>`;
}

function renderDesignNote() {
  const note = document.querySelector("#designNote");
  if (!note) return;
  if (state.screen !== "game") {
    note.innerHTML = "";
    return;
  }
  note.innerHTML = `
    <h2>系统取向</h2>
    <p>参考同类挂机 RPG 的通用结构：离线收益、推图解锁、更高关卡收益、角色抽取、阵容定位、升星和挑战塔。角色、数值、关卡和文案均为原创占位。</p>
  `;
}

function rarityClass(rare) {
  return `rarity ${rare.toLowerCase()}`;
}

function equipRareClass(rare) {
  return `equip-rarity equip-${equipmentRareKey(rare).toLowerCase()}`;
}

function rarityBorderClass(rare) {
  return `rare-border rare-border-${rare.toLowerCase()}`;
}

function equipBorderClass(rare) {
  return `equip-border equip-border-${equipmentRareKey(rare).toLowerCase()}`;
}

function petEquipList(petUid) {
  return state.data.equipment.filter(item => item.petUid === petUid);
}

function renderStars(stars) {
  const maxStars = 6;
  let html = "";
  for (let i = 1; i <= maxStars; i += 1) {
    const filled = i <= stars;
    let cls = "star";
    if (filled) {
      if (stars <= 2) cls += " star-gold";
      else if (stars <= 4) cls += " star-colorful";
      else cls += " star-rainbow";
    } else {
      cls += " star-empty";
    }
    if (stars >= 6) cls += " star-max";
    html += `<span class="${cls}">${filled ? "★" : "☆"}</span>`;
  }
  return html;
}

function renderEquipSlotGroup(pet, slot, icon, current, availableEquip) {
  const sorted = availableEquip
    .filter(e => getEquipSlot(e.eid) === slot)
    .sort((a, b) => (equipOrder[equipmentRareKey(equipmentDef(b.eid))] || 0) - (equipOrder[equipmentRareKey(equipmentDef(a.eid))] || 0));
  return `
    <div class="equip-slot-group">
      <div class="equip-slot-label">${icon} ${slot}</div>
      <div class="equip-slot-items">
        <div class="equip-row equipped-row">
          <span class="equip-label">已穿戴</span>
          ${current ? `
            <button class="equip-btn equipped ${equipmentRareKey(equipmentDef(current.eid)).toLowerCase()}" onclick="equipItemFromDetail('${pet.uid}', '', '${slot}')">
              ${equipmentRarity[equipmentRareKey(equipmentDef(current.eid))].name} ${equipmentDef(current.eid).name} (${equipmentPower(current)}) ×
            </button>
          ` : `<span class="equip-empty">空</span>`}
        </div>
        <div class="equip-row available-row">
          <span class="equip-label">可穿戴</span>
          ${sorted.map(e => {
            const def = equipmentDef(e.eid);
            const rareKey = equipmentRareKey(def);
            return `<button class="equip-btn ${rareKey.toLowerCase()}" onclick="equipItemFromDetail('${pet.uid}', '${e.uid}', '${slot}')">${equipmentRarity[rareKey].name} ${def.name} (${equipmentPower(e)})</button>`;
          }).join("") || `<span class="equip-empty">无可用装备</span>`}
        </div>
      </div>
    </div>
  `;
}

function petCard(pet) {
  const base = monster(pet.mid);
  const active = state.data.active.includes(pet.uid);
  const equipped = petEquipList(pet.uid);
  const hasUpgrade = state.data.food >= levelCost(pet).food && state.data.gold >= levelCost(pet).gold && pet.level < 80;
  const hasStar = pet.stars < 6 && state.data.shard >= starCost(pet).shard && pet.copies >= starCost(pet).copies;
  const hasEnhance = (pet.enhance || 0) < enhanceMax(pet) && pet.copies >= 1;
  const hasEquip = state.data.equipment.some(e => !e.petUid);
  const hasAction = hasUpgrade || hasStar || hasEnhance || hasEquip;
  const weapon = equipped.find(e => getEquipSlot(e.eid) === "武器");
  const armor = equipped.find(e => getEquipSlot(e.eid) === "衣服");
  const aura = equipped.find(e => getEquipSlot(e.eid) === "光环");
  return `
    <article class="card pet-card-compact ${rarityBorderClass(base.rare)} ${active ? "selected" : ""}" onclick="openPetDetail('${pet.uid}')">
      <div class="pet-card-header">
        <div class="pet-name-row">
          <strong>${petDisplayName(pet)}</strong>
          <span class="star-display">${renderStars(pet.stars)}</span>
        </div>
        <div class="pet-card-badges">
          <i class="${rarityClass(base.rare)}">${base.rare}</i>
          ${hasAction ? `<span class="action-hint">❗</span>` : ""}
          ${active ? `<span class="active-badge">上阵</span>` : ""}
        </div>
      </div>
      <div class="pet-card-stats">
        <span>Lv.${pet.level}</span>
        <span>+${pet.enhance || 0}</span>
        <span>战力 ${formatNum(petPower(pet))}</span>
      </div>
      <div class="pet-card-equip ${aura ? "has-aura" : ""}">
        <span>🗡️${weapon ? equipmentDef(weapon.eid).name : "空"}</span>
        <span>🛡️${armor ? equipmentDef(armor.eid).name : "空"}</span>
        <span>✨${aura ? equipmentDef(aura.eid).name : "空"}</span>
      </div>
      <div class="pet-card-click-hint">点击查看详情 →</div>
    </article>
  `;
}

function viewShell(title, text, action = "") {
  return `<div class="view-head"><div><h2>${title}</h2><p>${text}</p></div>${action}</div>`;
}

function renderAuth() {
  const isRegister = state.authMode === "register";
  return `
    <section class="auth-hero">
      <div class="auth-brand">
        <div class="brand-mark">星</div>
        <h2>星萌远征</h2>
        <p>文字挂机刷图页游原型</p>
      </div>
      <div class="auth-card">
        <div class="auth-tabs">
          <button class="${!isRegister ? "active" : ""}" onclick="setAuthMode('login')">登录</button>
          <button class="${isRegister ? "active" : ""}" onclick="setAuthMode('register')">注册</button>
        </div>
        <label>
          <span>登录用户名</span>
          <input id="authAccount" placeholder="英文、数字或邮箱符号，3-32位" autocomplete="username">
        </label>
        <label>
          <span>密码</span>
          <input id="authPassword" type="password" placeholder="请输入密码" autocomplete="${isRegister ? "new-password" : "current-password"}">
        </label>
        ${isRegister ? `
          <label>
            <span>确认密码</span>
            <input id="authConfirm" type="password" placeholder="请再次输入密码" autocomplete="new-password">
          </label>
        ` : ""}
        <button class="primary auth-submit" onclick="${isRegister ? "registerAccount()" : "loginAccount()"}">${isRegister ? "创建账号" : "登录账号"}</button>
      </div>
    </section>
  `;
}

function renderOnboarding() {
  return `
    <section class="onboarding">
      ${viewShell("创建训练师", "账号已注册。进入游戏前，先填写游戏名字并选择初始宝宝。账号用于登录，游戏名字用于显示在游戏内。")}
      <div class="create-grid">
        <section class="card create-card">
          <label>
            <span>游戏名字</span>
            <input id="playerName" placeholder="中文、英文或数字，2-16位" maxlength="16">
          </label>
          <label>
            <span>初始宝宝</span>
            <select id="starterSelect">
              ${starters.map(id => `<option value="${id}">${monster(id).name} · ${elements[monster(id).element]}系 · ${roles[monster(id).role]}</option>`).join("")}
            </select>
          </label>
          <button class="primary auth-submit" onclick="createCharacter()">进入游戏</button>
        </section>
        <section class="starter-list">
          ${starters.map(id => {
            const item = monster(id);
            return `
              <article class="card starter">
                <i class="${rarityClass(item.rare)}">${item.rare}</i>
                <h3>${item.name}</h3>
                <p>${elements[item.element]}系 · ${roles[item.role]} · ${item.skill}</p>
                <div class="mini-stats"><span>HP ${item.hp}</span><span>攻 ${item.atk}</span><span>防 ${item.def}</span><span>速 ${item.spd}</span></div>
              </article>
            `;
          }).join("")}
        </section>
      </div>
    </section>
  `;
}

function renderHome() {
  const idle = pendingIdle();
  const next = stageById(state.data.clearedStage + 1);
  return `
    ${viewShell("训练师大厅", "从注册选初始伙伴开始，核心循环是挂机收益、刷图解锁、召唤扩充阵容、养成后继续推图。", `<button class="primary" onclick="state.view='campaign';render()">开始冒险</button>`)}
    <div class="summary-grid">
      <section class="metric"><span>通关进度</span><strong>${state.data.clearedStage} 关</strong><p>${chapters[Math.min(Math.floor(Math.max(0, state.data.clearedStage - 1) / 8), chapters.length - 1)]?.[0] || chapters[0][0]}</p></section>
      <section class="metric"><span>队伍战力</span><strong>${formatNum(teamPower())}</strong><p>下一关推荐 ${formatNum(next.power)}</p></section>
      <section class="metric"><span>伙伴数量</span><strong>${state.data.roster.length}/${monsters.length}</strong><p>上阵 ${state.data.active.length}/5</p></section>
      <section class="metric"><span>待领挂机</span><strong>${idle.minutes} 分钟</strong><p>${formatReward(idle.reward) || "暂无收益"}</p></section>
    </div>
    ${state.data.firstCharge ? `
      <div class="first-charge-sign">
        <div class="sign-header">
          <span>🎁 首充3日签到</span>
          <span>${state.data.firstChargeSignDays.length}/3 天</span>
        </div>
        <div class="sign-grid">
          ${[1, 2, 3].map(day => {
            const rewards = getFirstChargeRewards()[day];
            const claimed = state.data.firstChargeSignDays.includes(day);
            const canClaim = canClaimFirstChargeDay(day);
            return `
              <div class="sign-card ${claimed ? "claimed" : canClaim ? "available" : "locked"}">
                <div class="sign-day">${rewards.title}</div>
                <div class="sign-rewards">
                  ${rewards.rewards.map(reward => `<span>${reward.icon} ${reward.label}</span>`).join("")}
                </div>
                <button onclick="claimFirstChargeDay(${day})" ${!canClaim ? "disabled" : ""}>${claimed ? "已领取" : canClaim ? "领取" : "未解锁"}</button>
              </div>
            `;
          }).join("")}
        </div>
      </div>
    ` : ""}
    <div class="chat-section">
      <div class="chat-header">
        <span>💬 世界聊天</span>
        <span class="chat-count">${(state.data.chatMessages || []).length} 条</span>
      </div>
      <div class="chat-messages" id="chatContainer">
        ${(state.data.chatMessages || []).map(chatMessageMarkup).join("") || `<p class="empty">还没有聊天消息。</p>`}
      </div>
      <div class="chat-input-row">
        <input id="chatInput" placeholder="说点什么..." maxlength="200" onkeydown="if(event.key==='Enter')sendChatMessage()">
        <button onclick="sendChatMessage()">发送</button>
      </div>
    </div>
    <div class="goal-panel">
      <span class="goal-icon">🎯</span>
      <span class="goal-text">${getNextGoal()}</span>
    </div>
    <div class="grid two">
      <section class="card">
        <h3>当前阵容</h3>
        <div class="team-row">${activePets().map(pet => `<span>${petDisplayName(pet)}<b>${formatNum(petPower(pet))}</b></span>`).join("")}</div>
      </section>
      <section class="card">
        <h3>邮件补给</h3>
        ${state.data.inbox.length ? state.data.inbox.map(mail => `
          <div class="mail-row"><div><strong>${mail.title}</strong><p>${formatReward(mail.reward)}</p></div><button onclick="claimMail('${mail.id}')">领取</button></div>
        `).join("") : `<p class="empty">暂无未领取邮件。</p>`}
      </section>
    </div>
  `;
}

function getNextGoal() {
  const save = state.data;
  if (!save) return "开始冒险吧！";
  const nextStage = save.clearedStage + 1;
  if (nextStage <= stages.length) {
    return `通关第 ${nextStage} 关（推荐战力 ${formatNum(stageById(nextStage).power)}）`;
  }
  return `继续推图，当前 ${save.clearedStage} 关 · 目标：战力 ${formatNum(teamPower() + 500)}`;
}

function renderIdle() {
  const idle = pendingIdle();
  const stage = stageById(state.data.farmingStage);
  const rate = idleRate();
  const farmOptions = [];
  const maxShow = Math.min(state.data.clearedStage || 1, 100);
  for (let i = 1; i <= maxShow; i++) {
    farmOptions.push(stageById(i));
  }
  if (state.data.clearedStage > 100) {
    farmOptions.splice(0, farmOptions.length - 20);
  }
  if (farmOptions.length === 0) {
    farmOptions.push(stageById(1));
  }
  return `
    ${viewShell("挂机刷图", "离线和在线都会累计挂机收益，上限 8 小时。通关越靠后的关卡，每分钟金币和经验果越高。", `<button class="primary" onclick="claimIdle()" ${idle.minutes <= 0 ? "disabled" : ""}>领取收益</button>`)}
    <div class="grid two">
      <section class="card">
        <h3>当前挂机地点</h3>
        <div class="stage-focus">
          <strong>${stage.name}</strong>
          <span>${stage.enemy} · 推荐战力 ${formatNum(stage.power)}</span>
        </div>
        <div class="stat-grid">
          <div><span>金币/分钟</span><b>${formatNum(rate.gold)}</b></div>
          <div><span>经验果/分钟</span><b>${formatNum(rate.food)}</b></div>
          <div><span>星尘概率</span><b>${Math.round(rate.shard * 100)}%</b></div>
          <div><span>挂机时间</span><b>${idle.minutes} 分</b></div>
        </div>
        <div class="actions">
          <button class="primary" onclick="claimIdle()" ${idle.minutes <= 0 ? "disabled" : ""}>领取挂机收益</button>
          <button onclick="sweep()" ${state.data.stamina < 3 ? "disabled" : ""}>快速扫荡</button>
          <button onclick="challenge(${state.data.clearedStage + 1})" ${state.data.stamina < 5 ? "disabled" : ""}>挑战下一关</button>
        </div>
      </section>
      <section class="card">
        <h3>切换挂机关卡</h3>
        <div class="stage-list compact">
          ${farmOptions.slice(-12).map(item => `<button class="${item.id === state.data.farmingStage ? "active" : ""}" onclick="setFarmStage(${item.id})">${item.id}. ${item.name}</button>`).join("")}
        </div>
      </section>
    </div>
  `;
}

function renderCampaign() {
  const nextId = state.data.clearedStage + 1;
  const nextStage = stageById(nextId);
  const nextElement = stageElement(nextStage);
  const nextAdv = elementAdvantage(nextElement);
  const autoRunning = isAutoCampaignRunning();
  const nextAutoSeconds = autoRunning ? Math.max(0, Math.ceil((state.autoCampaignNextAt - Date.now()) / 1000)) : 0;
  const towerFloor = state.data.towerFloor + 1;
  const towerPower = Math.floor(260 + towerFloor * 96 + Math.pow(towerFloor, 1.35) * 18);
  const towerEl = towerElement(towerFloor);
  const towerAdv = elementAdvantage(towerEl);
  const recent = state.data.battleRecords || [];
  return `
    ${viewShell("闯关", "主线和试炼塔放在这里统一挑战。自动主线按时间逐关推进，不会一次性刷空体力。")}
    <div class="adventure-grid">
      <section class="card adventure-card">
        <div class="adventure-head"><div><span>主线</span><h3>${nextStage.id}. ${nextStage.enemy}</h3><p>${nextStage.name} · ${elementName(nextElement)}系 · ${nextAdv.text}</p></div><strong>${state.data.clearedStage} 关</strong></div>
        <div class="stat-grid">
          <div><span>推荐战力</span><b>${formatNum(nextStage.power)}</b></div>
          <div><span>队伍战力</span><b>${formatNum(teamPower())}</b></div>
          <div><span>预计胜率</span><b>${battleChance(nextStage.power, nextElement)}%</b></div>
          <div><span>体力消耗</span><b>5</b></div>
        </div>
        <p class="muted">胜利后推进到下一关，并把挂机地点推进到最新关卡。自动主线每 ${Math.round(AUTO_CAMPAIGN_MS / 1000)} 秒挑战 1 次。</p>
        <div class="auto-status ${autoRunning ? "running" : ""}">
          <span>${autoRunning ? "自动主线运行中" : "自动主线未开启"}</span>
          <b>${autoRunning ? `${nextAutoSeconds} 秒后挑战` : `每次消耗 5 体力`}</b>
        </div>
        <div class="actions">
          <button class="primary" onclick="challenge(${nextId})" ${state.data.stamina < 5 ? "disabled" : ""}>挑战下一关</button>
          <button onclick="toggleAutoCampaign()" ${!autoRunning && state.data.stamina < 5 ? "disabled" : ""}>${autoRunning ? "停止自动" : "开启自动"}</button>
        </div>
      </section>
      <section class="card adventure-card">
        <div class="adventure-head"><div><span>试炼塔</span><h3>第 ${towerFloor} 层</h3><p>${elementName(towerEl)}系守卫 · ${towerAdv.text}</p></div><strong>${state.data.towerFloor} 层</strong></div>
        <div class="stat-grid">
          <div><span>推荐战力</span><b>${formatNum(towerPower)}</b></div>
          <div><span>队伍战力</span><b>${formatNum(teamPower())}</b></div>
          <div><span>预计胜率</span><b>${battleChance(towerPower, towerEl)}%</b></div>
          <div><span>奖励类型</span><b>钻/尘</b></div>
        </div>
        <p class="muted">试炼塔不消耗体力，适合检验当前阵容强度。</p>
        <div class="actions">
          <button class="primary" onclick="towerFight()">挑战本层</button>
          <button onclick="autoTower()">自动爬塔</button>
        </div>
      </section>
    </div>
    <section class="card counter-card">
      <h3>元素相克</h3>
      <p class="muted">上阵伙伴克制目标元素时，会提高预计胜率；被目标元素克制时，预计胜率会下降。</p>
      <div class="counter-row">
        <span><b>森</b><i>克</i><b>水</b></span>
        <span><b>水</b><i>克</i><b>火</b></span>
        <span><b>火</b><i>克</i><b>钢</b></span>
        <span><b>钢</b><i>克</i><b>雷</b></span>
        <span><b>雷</b><i>克</i><b>光</b></span>
        <span><b>光</b><i>克</i><b>影</b></span>
        <span><b>影</b><i>克</i><b>森</b></span>
      </div>
    </section>
    <section class="card">
      <div class="chapter-head"><div><h3>闯关记录</h3><p>最近主线和试炼塔结果会保留在这里。</p></div><button onclick="state.data.battleRecords=[];persist();render()">清空记录</button></div>
      <div class="record-list">
        ${recent.length ? recent.map(item => `
          <div class="record-item ${item.win ? "win" : "lose"}">
            <span>${item.time}</span><strong>${item.type} · ${item.target}</strong><p>${item.win ? "胜利" : "失败"} · ${item.detail}</p>
          </div>
        `).join("") : `<p class="empty">暂无闯关记录。</p>`}
      </div>
    </section>
  `;
}

function renderTeam() {
  const sorted = sortedRoster();
  return `
    ${viewShell("我的伙伴", "最多上阵 5 名伙伴。点击卡片上的按钮进行升级、升星和突破。", `<button onclick="openModal('enhanceGuide')">突破指南</button>`)}
    <div class="material-strip">
      <span>经验果：<b>${formatNum(state.data.food)}</b></span>
      <span>星尘：<b>${formatNum(state.data.shard)}</b></span>
    </div>
    <div class="formation-bar">${[0, 1, 2, 3, 4].map(i => {
      const pet = activePets()[i];
      return `<div class="slot">${pet ? `<strong>${petDisplayName(pet)}</strong><span>${formatNum(petPower(pet))}</span>` : `<span>空位</span>`}</div>`;
    }).join("")}</div>
    <div class="grid three">${sorted.map(pet => petCard(pet)).join("")}</div>
  `;
}

function renderSummon() {
  const goldLeft = Math.max(0, 10 - state.data.dailyDraw.goldPet);
  const petTab = state.summonTab === "pet";
  return `
    ${viewShell("抽奖中心", "宠物和装备分开抽取。金币宠物抽奖有每日次数限制，钻石池与装备池会产出更高品质。")}
    <div class="lottery-tabs">
      <button class="${petTab ? "active" : ""}" onclick="setSummonTab('pet')">宠物抽奖</button>
      <button class="${!petTab ? "active" : ""}" onclick="setSummonTab('equipment')">装备抽奖</button>
    </div>
    ${petTab ? `
      <div class="draw-grid">
        <section class="card draw-card">
          <div>
            <h3>金币宠物抽奖</h3>
            <p>每日限制 10 次，适合补齐 N/R/SR 图鉴，最高可出 SSR。</p>
            <div class="rate-row"><span>N 34%</span><span>R 50%</span><span>SR 14%</span><span>SSR 2%</span><span>今日剩余 ${goldLeft}/10</span></div>
          </div>
          <button class="primary" onclick="drawPet('gold', 1)" ${goldLeft <= 0 || state.data.gold < 260 ? "disabled" : ""}>金币抽 1 次 · 260</button>
        </section>
        <section class="card draw-card premium">
          <div>
            <h3>钻石宠物抽奖</h3>
            <p>高级宠物池，SSR/UR 概率更高，适合追主力伙伴。</p>
            <div class="rate-row"><span>N 28%</span><span>R 
             40%</span><span>SR 24%</span><span>SSR 6.5%</span><span>UR 1.5%</span></div>
          </div>
          <div class="actions inline"><button class="primary" onclick="drawPet('gem', 1)" ${state.data.gem < 100 ? "disabled" : ""}>钻石抽 1 次 · 100</button><button onclick="drawPet('gem', 10)" ${state.data.gem < 900 ? "disabled" : ""}>钻石抽 10 次 · 900</button></div>
        </section>
      </div>
      <h3 class="section-title">宠物图鉴</h3>
      <div class="collection-grid">
        ${sortedMonsters().map(item => {
          const owned = state.data.roster.find(pet => pet.mid === item.id);
          return `
            <article class="card dex ${rarityBorderClass(item.rare)} ${owned ? "owned" : ""}">
              <div class="pet-title"><div><strong>${item.name}</strong><span>${elements[item.element]}系 · ${roles[item.role]}</span></div><i class="${rarityClass(item.rare)}">${item.rare}</i></div>
              <p>${item.skill}</p>
              <div class="mini-stats"><span>HP ${item.hp}</span><span>攻 ${item.atk}</span><span>防 ${item.def}</span><span>速 ${item.spd}</span></div>
              <b>${owned ? `已拥有 · 碎片 ${owned.copies}` : "未获得"}</b>
            </article>
          `;
        }).join("")}
      </div>
    ` : `
      <section class="card draw-card premium">
        <div>
          <h3>装备抽奖</h3>
          <p>装备分 N、R、SR、SSR 四档，可在伙伴页面查看穿戴情况。</p>
          <div class="rate-row"><span>N 42%</span><span>R 32%</span><span>SR 20%</span><span>SSR 6%</span></div>
        </div>
        <div class="actions inline"><button class="primary" onclick="drawEquipment(1)" ${state.data.gem < 60 ? "disabled" : ""}>装备抽 1 次 · 60</button><button onclick="drawEquipment(10)" ${state.data.gem < 520 ? "disabled" : ""}>装备抽 10 次 · 520</button><button onclick="state.view='team';render()">查看伙伴</button></div>
      </section>
      <h3 class="section-title">装备图鉴</h3>
      <div class="collection-grid">
        ${sortedEquipmentPool().map(item => `
          <article class="card equip-card ${equipBorderClass(item.rare)}">
            <div class="pet-title"><div><strong>${item.name}</strong><span>${item.slot} · 战力基准 ${equipmentRarity[equipmentRareKey(item)].power}</span></div><i class="${equipRareClass(item.rare)}">${equipmentRarity[equipmentRareKey(item)].name}</i></div>
            <p>${item.desc}</p>
            <div class="mini-stats"><span>HP ${item.hp}</span><span>攻 ${item.atk}</span><span>防 ${item.def}</span></div>
          </article>
        `).join("")}
      </div>
    `}
  `;
}

function renderEquipment() {
  const allItems = [...state.data.equipment].sort((a, b) => equipmentPower(b) - equipmentPower(a));
  const filter = state.equipFilter || "all";
  const items = filter === "all" ? allItems : allItems.filter(item => getEquipSlot(item.eid) === filter);
  const roster = [...state.data.roster].sort((a, b) => petPower(b) - petPower(a));
  return `
    ${viewShell("装备背包", "装备通过装备抽奖获得，按颜色区分品质。选择伙伴后点击穿戴，同一件装备可随时卸下或换人。", `<button class="primary" onclick="state.view='summon';state.summonTab='equipment';render()">去装备抽奖</button>`)}
    <div class="summary-grid">
      <section class="metric"><span>装备数量</span><strong>${allItems.length}</strong><p>已穿戴 ${allItems.filter(item => item.petUid).length}</p></section>
      <section class="metric"><span>最高品质</span><strong>${allItems[0] ? equipmentRarity[equipmentRareKey(equipmentDef(allItems[0].eid))].name : "-"}</strong><p>${allItems[0] ? equipmentDef(allItems[0].eid).name : "暂无装备"}</p></section>
      <section class="metric"><span>装备抽数</span><strong>${state.data.stats.equipDraws}</strong><p>累计装备抽取次数</p></section>
      <section class="metric"><span>队伍战力</span><strong>${formatNum(teamPower())}</strong><p>装备会计入伙伴战力</p></section>
    </div>
    <div class="equip-filter">
      <button class="${filter === "all" ? "active" : ""}" onclick="state.equipFilter='all';render()">全部</button>
      <button class="${filter === "武器" ? "active" : ""}" onclick="state.equipFilter='武器';render()">🗡️ 武器</button>
      <button class="${filter === "衣服" ? "active" : ""}" onclick="state.equipFilter='衣服';render()">🛡️ 衣服</button>
      <button class="${filter === "光环" ? "active" : ""}" onclick="state.equipFilter='光环';render()">✨ 光环</button>
    </div>
    ${items.length ? `
      <div class="collection-grid">
        ${items.map(item => {
          const def = equipmentDef(item.eid);
          const wearer = state.data.roster.find(pet => pet.uid === item.petUid);
          return `
            <article class="card equip-card ${equipBorderClass(def.rare)}">
              <div class="pet-title"><div><strong>${def.name}</strong><span>${getEquipSlot(item.eid)} · ${wearer ? `穿戴者 ${petDisplayName(wearer)}` : "未穿戴"}</span></div><i class="${equipRareClass(def.rare)}">${equipmentRarity[equipmentRareKey(def)].name}</i></div>
              <p>${def.desc}</p>
              <div class="mini-stats"><span>HP ${def.hp}</span><span>攻 ${def.atk}</span><span>防 ${def.def}</span><span>战力 ${equipmentPower(item)}</span></div>
              <div class="equip-control">
                <select id="equipTarget-${item.uid}">
                  <option value="">卸下/不穿戴</option>
                  ${roster.map(pet => `<option value="${pet.uid}" ${pet.uid === item.petUid ? "selected" : ""}>${petDisplayName(pet)} · ${formatNum(petPower(pet))}</option>`).join("")}
                </select>
                <button class="primary" onclick="equipItem(document.getElementById('equipTarget-${item.uid}').value, '${item.uid}')">${item.petUid ? "更换" : "穿戴"}</button>
              </div>
            </article>
          `;
        }).join("")}
      </div>
    ` : `
      <section class="card empty-state">
        <h3>还没有装备</h3>
        <p>先到装备抽奖获取 N、R、SR、SSR 不同品质的装备，再回来给主力伙伴穿戴。</p>
        <button class="primary" onclick="state.view='summon';state.summonTab='equipment';render()">去装备抽奖</button>
      </section>
    `}
  `;
}

function renderGrowth() {
  const sorted = sortedRoster();
  const ranking = petLeaderboard();
  const rankClaimed = state.data.petRankRewardDate === currentDateKey();
  const rankRewards = ["80钻 · 冠军伙伴", "50钻 · 精英伙伴", "30钻 · 新星伙伴"];
  return `
    ${viewShell("伙伴养成", "重复宠物可用于强化，稀有度越高上限越高。+10 之后失败可能掉级，可使用保级卡和幸运卡降低风险。", `<button onclick="openModal('enhanceGuide')">强化指南</button>`)}
    <div class="summary-grid">
      <section class="metric"><span>试炼塔</span><strong>${state.data.towerFloor} 层</strong><p>下一层推荐 ${formatNum(260 + (state.data.towerFloor + 1) * 96)}</p></section>
      <section class="metric"><span>最高等级</span><strong>${Math.max(...state.data.roster.map(p => p.level))}</strong><p>等级上限 80</p></section>
      <section class="metric"><span>最高星级</span><strong>${Math.max(...state.data.roster.map(p => p.stars))}</strong><p>星级上限 6</p></section>
      <section class="metric"><span>最高强化</span><strong>+${Math.max(...state.data.roster.map(p => p.enhance || 0))}</strong><p>保级卡 ${state.data.protectCard} · 幸运卡 ${state.data.boostCard}</p></section>
    </div>
    <section class="card pet-rank-card">
      <div class="chapter-head">
        <div><h3>伙伴战力排行榜</h3><p>汇总本机所有玩家账号的伙伴战力。每日全榜前三名发放钻石和伙伴称号。</p></div>
        <button class="primary" onclick="claimPetRankRewards()" ${rankClaimed ? "disabled" : ""}>${rankClaimed ? "今日已领" : "领取今日奖励"}</button>
      </div>
      <div class="pet-rank-list">
        ${ranking.slice(0, 10).map((row, index) => {
          const base = row.base;
          return `
            <div class="pet-rank-row ${index < 3 ? "top" : ""} ${row.isCurrent ? "mine" : ""} ${base.rare.toLowerCase()}">
              <b>${index + 1}</b>
              <span class="rank-player">
                <strong class="${hasMonthCard(row.playerName) ? "vip-name" : ""}">${hasMonthCard(row.playerName) ? "👑 " : ""}${escapeHtml(row.playerName)}</strong>
                <small>${escapeHtml(row.playerTitle)}</small>
              </span>
              <span class="rank-name"><i class="${rarityClass(base.rare)}">${base.rare}</i>${petDisplayName(row.pet)}${row.pet.rankTitle ? `<em>${row.pet.rankTitle}</em>` : ""}</span>
              <span>${elements[base.element]}系 · ${roles[base.role]}</span>
              <strong>${formatNum(row.power)}</strong>
              <small>${rankRewards[index] || "参与排名"}</small>
            </div>
          `;
        }).join("")}
      </div>
    </section>
    <div class="grid two">${sorted.map(pet => petCard(pet)).join("")}</div>
  `;
}

function renderTasks() {
  return `
    ${viewShell("任务奖励", "日常和成长目标用于提供召唤券、星钻和养成材料，支撑单机试玩节奏。")}
    <div class="grid">
      ${tasks.map(task => {
        const done = task.done(state.data);
        const claimed = state.data.claimed.includes(task.id);
        return `
          <article class="card task-row">
            <div><span>${task.type}</span><h3>${task.title}</h3><p>${formatReward(task.reward)}</p></div>
            <button class="primary" onclick="claimTask('${task.id}')" ${!done || claimed ? "disabled" : ""}>${claimed ? "已领取" : done ? "领取奖励" : "未完成"}</button>
          </article>
        `;
      }).join("")}
    </div>
  `;
}

function renderBag() {
  const save = state.data;
  const tab = state.bagTab || "items";
  const roster = sortedRoster();
  const equips = [...save.equipment].sort((a, b) => {
    const da = equipmentDef(a.eid);
    const db = equipmentDef(b.eid);
    return (equipOrder[equipmentRareKey(db)] || 0) - (equipOrder[equipmentRareKey(da)] || 0) || equipmentPower(b) - equipmentPower(a);
  });
  const petsWithShards = sortedRoster(save.roster);
  return `
    ${viewShell("背包", "道具、装备和伙伴碎片分开管理。")}
    <div class="bag-tabs">
      <button class="${tab === "items" ? "active" : ""}" onclick="state.bagTab='items';render()">道具</button>
      <button class="${tab === "equipment" ? "active" : ""}" onclick="state.bagTab='equipment';render()">装备</button>
      <button class="${tab === "shards" ? "active" : ""}" onclick="state.bagTab='shards';render()">碎片</button>
    </div>
    ${tab === "items" ? `
      <div class="bag-grid">
        <div class="bag-item"><span class="bag-icon">🛡️</span><span class="bag-name">保级卡</span><strong>${formatNum(save.protectCard || 0)}</strong></div>
        <div class="bag-item"><span class="bag-icon">🍀</span><span class="bag-name">幸运符</span><strong>${formatNum(save.boostCard || 0)}</strong></div>
        <div class="bag-item"><span class="bag-icon">🌟</span><span class="bag-name">UR自选券</span><strong>${formatNum(save.urTicket || 0)}</strong></div>
        <div class="bag-item"><span class="bag-icon">✧</span><span class="bag-name">星尘</span><strong>${formatNum(save.shard)}</strong></div>
        <div class="bag-item"><span class="bag-icon">▲</span><span class="bag-name">经验果</span><strong>${formatNum(save.food)}</strong></div>
      </div>
      <div class="bag-summary">
        <p>保级卡：突破失败时不掉级。</p>
        <p>幸运符：本次突破成功率 +15%。</p>
        <p>UR自选券：可在首充签到中获得，用于选择 1 名 UR 伙伴。</p>
      </div>
    ` : tab === "equipment" ? `
      ${equips.length ? `<div class="bag-equipment-list">
        ${equips.map(item => {
          const def = equipmentDef(item.eid);
          const wearer = save.roster.find(pet => pet.uid === item.petUid);
          return `
            <article class="card bag-equip-row ${equipBorderClass(def.rare)}">
              <div>
                <strong>${def.name}</strong>
                <span>${equipmentRarity[equipmentRareKey(def)].name} · ${getEquipSlot(item.eid)} · 战力 ${formatNum(equipmentPower(item))}</span>
                <p>${wearer ? `已穿戴：${petDisplayName(wearer)}` : "未穿戴"}</p>
              </div>
              <div class="equip-control">
                <select id="bagEquipTarget-${item.uid}">
                  <option value="">卸下/不穿戴</option>
                  ${roster.map(pet => `<option value="${pet.uid}" ${pet.uid === item.petUid ? "selected" : ""}>${petDisplayName(pet)} · ${formatNum(petPower(pet))}</option>`).join("")}
                </select>
                <button class="primary" onclick="equipItem(document.getElementById('bagEquipTarget-${item.uid}').value, '${item.uid}')">${item.petUid ? "更换" : "穿戴"}</button>
              </div>
            </article>
          `;
        }).join("")}
      </div>` : `<section class="card empty-state"><h3>还没有装备</h3><p>去抽奖中心抽取装备后，会在这里按品质排列。</p></section>`}
    ` : `
      <div class="collection-grid">
        ${petsWithShards.map(pet => {
          const base = monster(pet.mid);
          return `
            <article class="card shard-card ${rarityBorderClass(base.rare)}">
              <div class="pet-title"><div><strong>${petDisplayName(pet)}</strong><span>${elements[base.element]}系 · ${roles[base.role]}</span></div><i class="${rarityClass(base.rare)}">${base.rare}</i></div>
              <div class="mini-stats"><span>碎片 ${formatNum(pet.copies || 0)}</span><span>突破 +${pet.enhance || 0}</span><span>星级 ${pet.stars}/6</span></div>
            </article>
          `;
        }).join("") || `<section class="card empty-state"><h3>暂无碎片</h3><p>抽到重复伙伴后会转为同名碎片。</p></section>`}
      </div>
    `}
  `;
}

function renderShop() {
  const capCost = state.data.maxStamina >= STAMINA_CAP_LIMIT ? "已满" : `星钻 ${staminaBreakCost()}`;
  const items = [
    ["ticket", "召唤券", "用于抽取新伙伴或重复碎片", "星钻 90"],
    ["stamina", "体力包", "用于快速扫荡和手动推图", "星钻 50"],
    ["staminaCap", "体力上限突破", `永久上限 +5，当前 ${state.data.maxStamina}/${STAMINA_CAP_LIMIT}`, capCost],
    ["shard", "星尘包", "升星和装备强化材料", "金币 420"],
    ["food", "经验果箱", "快速提升伙伴等级", "金币 360"],
    ["protectCard", "保级卡", "+10 之后强化失败时防止等级 -1", "星钻 120"],
    ["boostCard", "幸运卡", "本次强化成功率 +15%", "星钻 80"]
  ];
  return `
    ${viewShell("商店", "当前为单机试玩商店，只消耗游戏内资源，不包含充值或联网支付。", `<div class="actions inline"><button class="admin-toggle" onclick="toggleAdminPanel()">🔑 管理</button><button class="warn" onclick="resetSave()">重置存档</button></div>`)}
    ${adminPanelVisible ? `
      <div class="admin-panel">
        <h3>🔑 月卡管理后台</h3>
        <div class="admin-row">
          <input id="adminPlayerName" placeholder="输入玩家游戏名字" list="playerList">
          <datalist id="playerList">
            ${state.data ? `<option value="${state.data.name}">` : ""}
          </datalist>
          <button onclick="adminActivateByName()" class="primary">激活月卡</button>
        </div>
        <div class="admin-row">
          <button onclick="adminAdd30Days()">续费30天</button>
          <button onclick="adminRemoveMonthCard()" class="warn">移除月卡</button>
        </div>
        <div class="admin-list">
          <h4>当前月卡玩家</h4>
          ${Object.entries(getMonthCardPlayers()).map(([name, data]) => `
            <div class="admin-player-item ${Date.now() < data.expiresAt ? "active" : "expired"}">
              <span>${escapeHtml(name)}</span>
              <span>${new Date(data.activatedAt).toLocaleDateString()}</span>
              <span>${getMonthCardDaysLeft(name)} 天</span>
              <span>${Date.now() < data.expiresAt ? "有效" : "过期"}</span>
            </div>
          `).join("") || `<div class="empty">暂无月卡玩家</div>`}
        </div>
      </div>
    ` : ""}
    <div class="grid two">
      ${items.map(([id, name, text, price]) => `
        <article class="card shop-row">
          <div><h3>${name}</h3><p>${text}</p><span>${price}</span></div>
          <button onclick="buy('${id}')" ${id === "staminaCap" && state.data.maxStamina >= STAMINA_CAP_LIMIT ? "disabled" : ""}>购买</button>
        </article>
      `).join("")}
    </div>
  `;
}

function renderContent() {
  const el = document.querySelector("#content");
  if (state.screen === "auth") {
    el.innerHTML = renderAuth();
    return;
  }
  if (state.screen === "onboarding") {
    el.innerHTML = renderOnboarding();
    return;
  }
  const views = {
    home: renderHome,
    idle: renderIdle,
    campaign: renderCampaign,
    team: renderTeam,
    growth: renderGrowth,
    summon: renderSummon,
    tasks: renderTasks,
    shop: renderShop,
    bag: renderBag
  };
  el.innerHTML = (views[state.view] || renderTeam)();
}

function render() {
  document.body.dataset.mode = state.screen;
  if (state.data) {
    recoverStamina();
    persist();
  }
  renderAccount();
  renderNav();
  renderResources();
  renderLog();
  renderDesignNote();
  renderContent();
  renderModal();
}

function startTicker() {
  if (state.ticker) clearInterval(state.ticker);
  state.ticker = setInterval(() => {
    if (!state.data) return;
    recoverStamina();
    persist();
    if (isAutoCampaignRunning() && state.view === "campaign") {
      render();
      return;
    }
    renderResources();
  }, IDLE_TICK_MS);
}

const lastAccount = localStorage.getItem(LAST_ACCOUNT_KEY);
if (lastAccount && (readAccount(lastAccount) || localStorage.getItem(saveKey(lastAccount)))) {
  state.account = lastAccount;
  load(lastAccount);
  addLog(state.data ? "已恢复最近试玩角色。" : "已恢复最近登录账号。");
}

startTicker();
render();
