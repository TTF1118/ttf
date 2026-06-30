const STORAGE_PREFIX = "starlingRpg:v2:";
const ACCOUNT_PREFIX = "starlingRpg:account:";
const LAST_ACCOUNT_KEY = "starlingRpg:lastAccount:v2";
const IDLE_CAP_MS = 8 * 60 * 60 * 1000;
const IDLE_TICK_MS = 9000;

const elements = {
  leaf: "森",
  fire: "火",
  water: "水",
  thunder: "雷",
  light: "光",
  shadow: "影",
  metal: "钢"
};

const roles = {
  guard: "前排",
  strike: "强攻",
  blast: "群攻",
  support: "辅助",
  control: "控制"
};

const starters = ["sprout", "spark", "shell"];

const monsters = [
  { id: "sprout", name: "芽芽狐", rare: "N", element: "leaf", role: "support", skill: "藤芽鼓舞", hp: 88, atk: 20, def: 15, spd: 15, bio: "新手森林里最常见的伙伴，擅长稳定回复。" },
  { id: "spark", name: "电团鼠", rare: "N", element: "thunder", role: "strike", skill: "电弧连击", hp: 74, atk: 27, def: 11, spd: 23, bio: "行动很快，适合早期推图补伤害。" },
  { id: "shell", name: "潮壳龟", rare: "N", element: "water", role: "guard", skill: "潮壳护阵", hp: 110, atk: 18, def: 25, spd: 8, bio: "耐打的前排，能让队伍更稳。" },
  { id: "moss", name: "苔石兽", rare: "N", element: "leaf", role: "guard", skill: "硬壳扎根", hp: 116, atk: 17, def: 23, spd: 7, bio: "普通但可靠的防线。" },
  { id: "bubble", name: "泡泡鸭", rare: "N", element: "water", role: "control", skill: "泡影迟缓", hp: 82, atk: 21, def: 13, spd: 17, bio: "能拖慢敌人的节奏。" },
  { id: "cinder", name: "灰烬犬", rare: "R", element: "fire", role: "strike", skill: "炽牙撕咬", hp: 92, atk: 34, def: 14, spd: 20, bio: "火系单体输出，适合打首领。" },
  { id: "glider", name: "云翼狸", rare: "R", element: "light", role: "support", skill: "云羽守护", hp: 96, atk: 24, def: 18, spd: 18, bio: "提升小队生存，挂机收益稳定。" },
  { id: "magnet", name: "磁尾鼬", rare: "R", element: "thunder", role: "control", skill: "磁场牵引", hp: 86, atk: 28, def: 16, spd: 22, bio: "控制型伙伴，能压住高速敌人。" },
  { id: "reef", name: "珊瑚鹿", rare: "R", element: "water", role: "support", skill: "潮汐复苏", hp: 98, atk: 23, def: 17, spd: 16, bio: "水系治疗，适合长线挂机。" },
  { id: "thorn", name: "刺藤熊", rare: "R", element: "leaf", role: "guard", skill: "荆棘反震", hp: 132, atk: 23, def: 29, spd: 9, bio: "反伤前排，推图容错高。" },
  { id: "ember", name: "炽尾猫", rare: "SR", element: "fire", role: "strike", skill: "尾焰突袭", hp: 100, atk: 43, def: 16, spd: 25, bio: "高爆发输出，首领战表现突出。" },
  { id: "moon", name: "月铃鹿", rare: "SR", element: "light", role: "support", skill: "月辉治愈", hp: 108, atk: 30, def: 22, spd: 19, bio: "兼具治疗和护盾的核心辅助。" },
  { id: "rune", name: "符文鸮", rare: "SR", element: "shadow", role: "blast", skill: "夜幕法阵", hp: 94, atk: 40, def: 15, spd: 21, bio: "影系群攻，适合快速清图。" },
  { id: "bronze", name: "铜甲犀", rare: "SR", element: "metal", role: "guard", skill: "重甲冲锋", hp: 152, atk: 29, def: 35, spd: 8, bio: "稳定前排，能抗高压关卡。" },
  { id: "lotus", name: "莲灯兔", rare: "SR", element: "leaf", role: "support", skill: "莲灯净化", hp: 104, atk: 28, def: 20, spd: 24, bio: "辅助与驱散兼备。" },
  { id: "storm", name: "岚雷鹰", rare: "SR", element: "thunder", role: "blast", skill: "落雷风暴", hp: 96, atk: 42, def: 15, spd: 28, bio: "高速群攻，挂机清怪效率高。" },
  { id: "iron", name: "铁角犀", rare: "SSR", element: "metal", role: "guard", skill: "钢壁阵列", hp: 184, atk: 36, def: 46, spd: 10, bio: "顶级前排，越到后期越稳。" },
  { id: "phoenix", name: "绯羽凰", rare: "SSR", element: "fire", role: "blast", skill: "赤羽天火", hp: 126, atk: 58, def: 22, spd: 26, bio: "火系群攻核心，推图速度很快。" },
  { id: "levi", name: "深潮鲸", rare: "SSR", element: "water", role: "guard", skill: "深潮壁垒", hp: 198, atk: 34, def: 42, spd: 7, bio: "高血量守护者，适合越级挑战。" },
  { id: "nova", name: "星核龙", rare: "SSR", element: "light", role: "strike", skill: "星核裁决", hp: 138, atk: 62, def: 24, spd: 23, bio: "单体爆发极高，首领克星。" },
  { id: "shade", name: "影镰蛛", rare: "SSR", element: "shadow", role: "control", skill: "暗网封锁", hp: 122, atk: 50, def: 21, spd: 31, bio: "高速控制，适合挑战塔。" },
  { id: "terra", name: "古森龟", rare: "UR", element: "leaf", role: "guard", skill: "万木归根", hp: 230, atk: 42, def: 56, spd: 8, bio: "传说级守护者，能保护全队。" },
  { id: "aurora", name: "极光狐", rare: "UR", element: "light", role: "support", skill: "极光赐福", hp: 154, atk: 45, def: 32, spd: 30, bio: "传说级辅助，提升全队挂机效率。" },
  { id: "volt", name: "雷霆麒麟", rare: "UR", element: "thunder", role: "blast", skill: "万钧雷域", hp: 150, atk: 68, def: 26, spd: 34, bio: "传说级群攻，后期清图主力。" },
  { id: "seedling", name: "叶团狸", rare: "N", element: "leaf", role: "support", skill: "叶露滋养", hp: 84, atk: 19, def: 16, spd: 16, bio: "常见的森系伙伴，能补少量续航。" },
  { id: "flint", name: "火绒兔", rare: "N", element: "fire", role: "strike", skill: "火绒扑击", hp: 78, atk: 26, def: 12, spd: 21, bio: "动作灵活，前期补刀稳定。" },
  { id: "drizzle", name: "雨滴蛙", rare: "N", element: "water", role: "control", skill: "水泡牵制", hp: 86, atk: 20, def: 14, spd: 18, bio: "用水泡干扰敌人行动。" },
  { id: "tin", name: "锡壳虫", rare: "N", element: "metal", role: "guard", skill: "薄壳防御", hp: 120, atk: 16, def: 24, spd: 7, bio: "普通防御型伙伴，适合过渡。" },
  { id: "mote", name: "光点雀", rare: "N", element: "light", role: "support", skill: "微光引导", hp: 80, atk: 22, def: 12, spd: 22, bio: "轻量辅助，能提升队伍节奏。" },
  { id: "shadebud", name: "影芽鼠", rare: "N", element: "shadow", role: "control", skill: "影缠", hp: 76, atk: 24, def: 11, spd: 24, bio: "擅长短暂牵制目标。" },
  { id: "coal", name: "煤球兽", rare: "R", element: "fire", role: "guard", skill: "余烬护甲", hp: 124, atk: 25, def: 28, spd: 10, bio: "火系耐久伙伴，可承受持续伤害。" },
  { id: "spray", name: "浪花貂", rare: "R", element: "water", role: "strike", skill: "浪切", hp: 90, atk: 35, def: 15, spd: 21, bio: "水系快速输出，适合清理后排。" },
  { id: "ivy", name: "藤甲鹿", rare: "R", element: "leaf", role: "guard", skill: "藤盾", hp: 136, atk: 22, def: 31, spd: 9, bio: "稳定前排，能吸收更多普攻。" },
  { id: "pulse", name: "脉冲鸽", rare: "R", element: "thunder", role: "blast", skill: "脉冲扩散", hp: 88, atk: 31, def: 14, spd: 24, bio: "雷系小范围输出。" },
  { id: "gleam", name: "辉尾猫", rare: "R", element: "light", role: "support", skill: "辉尾祈愿", hp: 100, atk: 23, def: 18, spd: 19, bio: "轻度治疗和护盾都能提供。" },
  { id: "nightjar", name: "夜啼雀", rare: "R", element: "shadow", role: "control", skill: "夜啼扰魂", hp: 84, atk: 29, def: 15, spd: 25, bio: "压制敌方速度，适合控制队。" },
  { id: "silver", name: "银针鼬", rare: "R", element: "metal", role: "strike", skill: "银针连刺", hp: 88, atk: 36, def: 17, spd: 22, bio: "钢系单点输出，成长平滑。" },
  { id: "maple", name: "枫角羊", rare: "R", element: "leaf", role: "support", skill: "枫叶祝福", hp: 106, atk: 24, def: 20, spd: 17, bio: "提供队伍增益和少量回复。" },
  { id: "flare", name: "焰冠鸡", rare: "SR", element: "fire", role: "blast", skill: "焰冠爆鸣", hp: 104, atk: 44, def: 17, spd: 24, bio: "火系群攻伙伴，推图效率高。" },
  { id: "tide", name: "潮音鲸", rare: "SR", element: "water", role: "support", skill: "潮音回响", hp: 130, atk: 30, def: 25, spd: 15, bio: "治疗和减伤兼备。" },
  { id: "vine", name: "蔓生蝶", rare: "SR", element: "leaf", role: "control", skill: "蔓网封路", hp: 92, atk: 36, def: 18, spd: 27, bio: "控制型森系伙伴。" },
  { id: "arc", name: "弧光豹", rare: "SR", element: "thunder", role: "strike", skill: "弧光突袭", hp: 102, atk: 46, def: 16, spd: 30, bio: "高速单体输出。" },
  { id: "halo", name: "圣环鹿", rare: "SR", element: "light", role: "support", skill: "圣环庇护", hp: 118, atk: 29, def: 26, spd: 20, bio: "提供稳定护盾。" },
  { id: "wraith", name: "幽纹狐", rare: "SR", element: "shadow", role: "control", skill: "幽纹锁链", hp: 96, atk: 38, def: 17, spd: 26, bio: "适合打断敌方节奏。" },
  { id: "gearox", name: "齿轮牛", rare: "SR", element: "metal", role: "guard", skill: "齿轮壁垒", hp: 158, atk: 28, def: 38, spd: 7, bio: "钢系中坚前排。" },
  { id: "sakura", name: "樱灯狐", rare: "SR", element: "leaf", role: "support", skill: "樱灯复苏", hp: 110, atk: 31, def: 21, spd: 23, bio: "续航型辅助，适合挂机。" },
  { id: "basalt", name: "玄岩龟", rare: "SSR", element: "metal", role: "guard", skill: "玄岩镇守", hp: 206, atk: 35, def: 50, spd: 6, bio: "高防御前排，适合首领战。" },
  { id: "sunspark", name: "日焰狮", rare: "SSR", element: "fire", role: "strike", skill: "日焰裁断", hp: 136, atk: 64, def: 23, spd: 24, bio: "火系爆发核心。" },
  { id: "glacier", name: "冰潮龙", rare: "SSR", element: "water", role: "control", skill: "冰潮禁锢", hp: 142, atk: 48, def: 28, spd: 22, bio: "水系控制和输出兼具。" },
  { id: "forestking", name: "森王鹿", rare: "SSR", element: "leaf", role: "support", skill: "森王赐福", hp: 150, atk: 38, def: 34, spd: 21, bio: "高阶团队辅助。" },
  { id: "thundra", name: "雷镜蛇", rare: "SSR", element: "thunder", role: "strike", skill: "雷镜穿刺", hp: 124, atk: 60, def: 22, spd: 32, bio: "高速穿透输出。" },
  { id: "seraph", name: "辉翼天马", rare: "SSR", element: "light", role: "support", skill: "辉翼净化", hp: 144, atk: 42, def: 30, spd: 25, bio: "净化和护盾能力突出。" },
  { id: "abyss", name: "渊影狼", rare: "SSR", element: "shadow", role: "blast", skill: "渊影裂域", hp: 128, atk: 56, def: 22, spd: 29, bio: "影系群攻核心。" },
  { id: "meteor", name: "陨铁猿", rare: "SSR", element: "metal", role: "strike", skill: "陨铁重击", hp: 152, atk: 55, def: 32, spd: 17, bio: "重击型钢系输出。" },
  { id: "worldtree", name: "世界树灵", rare: "SSR", element: "leaf", role: "support", skill: "万叶领域", hp: 180, atk: 48, def: 40, spd: 28, bio: "高阶辅助，提升全队续航。" },
  { id: "solar", name: "太阳狮鹫", rare: "UR", element: "fire", role: "blast", skill: "太阳风暴", hp: 162, atk: 74, def: 30, spd: 31, bio: "传说级火系群攻。" },
  { id: "kraken", name: "深渊章王", rare: "UR", element: "water", role: "control", skill: "深渊潮锁", hp: 198, atk: 58, def: 42, spd: 20, bio: "传说级控制前排。" },
  { id: "zeus", name: "雷域神鹿", rare: "SSR", element: "thunder", role: "strike", skill: "雷域审判", hp: 166, atk: 76, def: 29, spd: 36, bio: "高阶高速输出。" },
  { id: "eclipse", name: "蚀月鸦", rare: "UR", element: "shadow", role: "blast", skill: "蚀月黑潮", hp: 154, atk: 72, def: 28, spd: 34, bio: "传说级影系清场核心。" },
  { id: "aegis", name: "星盾巨像", rare: "UR", element: "metal", role: "guard", skill: "星盾要塞", hp: 250, atk: 45, def: 64, spd: 9, bio: "传说级守护者，抗压极强。" },
  { id: "prism", name: "棱光龙", rare: "SSR", element: "light", role: "strike", skill: "棱光裁线", hp: 160, atk: 73, def: 31, spd: 33, bio: "高阶光系单体核心。" },
  { id: "emberlord", name: "炎狱麒麟", rare: "SSR", element: "fire", role: "strike", skill: "炎狱踏破", hp: 172, atk: 78, def: 33, spd: 30, bio: "后期强攻王牌。" },
  { id: "pebble", name: "卵石龟", rare: "N", element: "metal", role: "guard", skill: "卵石护身", hp: 118, atk: 15, def: 25, spd: 6, bio: "低阶守护伙伴，耐久不错。" },
  { id: "dewcat", name: "露珠猫", rare: "N", element: "water", role: "support", skill: "露珠轻疗", hp: 82, atk: 20, def: 13, spd: 20, bio: "新手常见的水系辅助。" },
  { id: "ashfox", name: "灰焰狐", rare: "R", element: "fire", role: "control", skill: "灰焰迷烟", hp: 92, atk: 30, def: 16, spd: 23, bio: "用烟雾扰乱敌方阵型。" },
  { id: "goldfin", name: "金鳍鱼", rare: "R", element: "water", role: "support", skill: "金鳍祝潮", hp: 102, atk: 24, def: 19, spd: 18, bio: "提供持续恢复和水系增益。" },
  { id: "lampmoth", name: "灯翼蛾", rare: "SR", element: "light", role: "support", skill: "灯翼守望", hp: 108, atk: 32, def: 23, spd: 25, bio: "光系护盾辅助。" },
  { id: "quakebear", name: "震岩熊", rare: "SR", element: "metal", role: "guard", skill: "震岩压制", hp: 166, atk: 31, def: 40, spd: 8, bio: "兼具前排和压制能力。" },
  { id: "mirage", name: "幻沙狐", rare: "SSR", element: "shadow", role: "control", skill: "幻沙迷阵", hp: 130, atk: 49, def: 24, spd: 33, bio: "高阶控制伙伴，擅长拖慢首领。" },
  { id: "skywhale", name: "云海鲸", rare: "SSR", element: "water", role: "support", skill: "云海潮歌", hp: 164, atk: 40, def: 36, spd: 19, bio: "高阶治疗核心。" },
  { id: "cosmos", name: "星界鹿", rare: "SSR", element: "light", role: "support", skill: "星界回响", hp: 176, atk: 54, def: 38, spd: 32, bio: "高阶光系辅助，适合长线作战。" },
  { id: "nether", name: "冥河龙", rare: "SSR", element: "shadow", role: "control", skill: "冥河封域", hp: 188, atk: 64, def: 36, spd: 27, bio: "高阶控制核心，能压制高难敌人。" }
];

const equipmentRarity = {
  N: { name: "N", color: "n", power: 45 },
  R: { name: "R", color: "r", power: 120 },
  SR: { name: "SR", color: "sr", power: 260 },
  SSR: { name: "SSR", color: "ssr", power: 560 }
};

const equipmentPool = [
  { id: "leaf_charm", name: "新叶护符", slot: "饰品", rare: "white", atk: 4, def: 7, hp: 28, desc: "入门护符，提供少量生命和防御。" },
  { id: "copper_claw", name: "铜制利爪", slot: "武器", rare: "green", atk: 12, def: 3, hp: 20, desc: "适合前期输出伙伴。" },
  { id: "mist_shell", name: "雾湖甲壳", slot: "护甲", rare: "green", atk: 5, def: 16, hp: 48, desc: "提高前排稳定性。" },
  { id: "storm_ring", name: "岚雷指环", slot: "饰品", rare: "blue", atk: 22, def: 8, hp: 42, desc: "增加速度型伙伴的爆发。" },
  { id: "moon_staff", name: "月辉短杖", slot: "武器", rare: "blue", atk: 18, def: 12, hp: 70, desc: "辅助伙伴常用装备。" },
  { id: "rune_mail", name: "符文战甲", slot: "护甲", rare: "purple", atk: 16, def: 34, hp: 120, desc: "中期防御核心装备。" },
  { id: "phoenix_blade", name: "绯羽刃", slot: "武器", rare: "purple", atk: 46, def: 12, hp: 90, desc: "高攻击紫装，适合强攻。" },
  { id: "star_core", name: "星核吊坠", slot: "饰品", rare: "orange", atk: 56, def: 26, hp: 180, desc: "橙色饰品，提供全面属性。" },
  { id: "dragon_scale", name: "龙鳞重甲", slot: "护甲", rare: "orange", atk: 34, def: 72, hp: 260, desc: "首领战前排装备。" },
  { id: "aurora_crown", name: "极光冠冕", slot: "饰品", rare: "red", atk: 88, def: 58, hp: 360, desc: "红色传说装备，稀有且强力。" },
  { id: "reed_dagger", name: "芦叶短刃", slot: "武器", rare: "white", atk: 7, def: 2, hp: 18, desc: "轻便的入门武器。" },
  { id: "cloth_robe", name: "训练布甲", slot: "护甲", rare: "white", atk: 2, def: 9, hp: 34, desc: "训练师常备的基础护甲。" },
  { id: "ember_band", name: "余烬臂环", slot: "饰品", rare: "green", atk: 11, def: 6, hp: 38, desc: "提供少量攻击和生命。" },
  { id: "wave_guard", name: "浪纹护肩", slot: "护甲", rare: "green", atk: 4, def: 18, hp: 58, desc: "水系伙伴常用防具。" },
  { id: "iron_spear", name: "铁木长枪", slot: "武器", rare: "green", atk: 16, def: 5, hp: 28, desc: "可靠的前期武器。" },
  { id: "spark_lens", name: "电光镜片", slot: "饰品", rare: "blue", atk: 24, def: 6, hp: 55, desc: "适合高速输出伙伴。" },
  { id: "forest_cloak", name: "森语斗篷", slot: "护甲", rare: "blue", atk: 10, def: 26, hp: 92, desc: "兼具生命和防御。" },
  { id: "shadow_blade", name: "影纹短刃", slot: "武器", rare: "blue", atk: 30, def: 8, hp: 50, desc: "影系攻击装备。" },
  { id: "sun_medal", name: "日辉勋章", slot: "饰品", rare: "purple", atk: 34, def: 20, hp: 130, desc: "紫色通用饰品。" },
  { id: "thunder_armor", name: "雷纹战甲", slot: "护甲", rare: "purple", atk: 20, def: 42, hp: 150, desc: "提高生存和反击能力。" },
  { id: "crystal_bow", name: "晶羽长弓", slot: "武器", rare: "purple", atk: 52, def: 10, hp: 86, desc: "适合高速强攻伙伴。" },
  { id: "deep_orb", name: "深潮宝珠", slot: "饰品", rare: "purple", atk: 28, def: 28, hp: 170, desc: "水系辅助偏爱的装备。" },
  { id: "solar_sword", name: "日冕长剑", slot: "武器", rare: "orange", atk: 68, def: 22, hp: 160, desc: "橙色攻击装备。" },
  { id: "world_bark", name: "古树重铠", slot: "护甲", rare: "orange", atk: 28, def: 78, hp: 310, desc: "森系前排核心装备。" },
  { id: "void_chain", name: "虚空锁链", slot: "饰品", rare: "orange", atk: 60, def: 30, hp: 210, desc: "兼具控制和输出属性。" },
  { id: "storm_crown", name: "雷暴王冠", slot: "饰品", rare: "orange", atk: 64, def: 24, hp: 190, desc: "雷系输出毕业饰品。" },
  { id: "star_halberd", name: "星辉战戟", slot: "武器", rare: "red", atk: 98, def: 42, hp: 300, desc: "红色传说武器，爆发极高。" },
  { id: "origin_mail", name: "源初神甲", slot: "护甲", rare: "red", atk: 62, def: 96, hp: 440, desc: "红色传说护甲，守护核心。" },
  { id: "eclipse_eye", name: "蚀月之眼", slot: "饰品", rare: "red", atk: 92, def: 60, hp: 380, desc: "影系传说饰品。" },
  { id: "heaven_ring", name: "天界指环", slot: "饰品", rare: "red", atk: 84, def: 70, hp: 420, desc: "光系传说饰品，属性全面。" }
];

const enhanceMaxByRare = { N: 3, R: 3, SR: 5, SSR: 10, UR: 20 };
const enhanceRates = {
  N: [100, 82, 65],
  R: [100, 78, 58],
  SR: [96, 82, 68, 52, 38],
  SSR: [92, 82, 72, 62, 52, 44, 36, 30, 24, 20],
  UR: [88, 80, 72, 65, 58, 51, 45, 39, 34, 29, 25, 21, 18, 15, 12, 10, 8, 6, 5, 4]
};

const rarityOrder = { UR: 5, SSR: 4, SR: 3, R: 2, N: 1 };
const equipOrder = { SSR: 4, SR: 3, R: 2, N: 1 };

function sortedMonsters(list = monsters) {
  return [...list].sort((a, b) => (rarityOrder[b.rare] - rarityOrder[a.rare]) || a.name.localeCompare(b.name, "zh-CN"));
}

function sortedEquipmentPool(list = equipmentPool) {
  return [...list].sort((a, b) => (equipOrder[equipmentRareKey(b)] - equipOrder[equipmentRareKey(a)]) || a.name.localeCompare(b.name, "zh-CN"));
}

function sortedRoster(list = state.data?.roster || []) {
  return [...list].sort((a, b) => {
    const ma = monster(a.mid);
    const mb = monster(b.mid);
    return (rarityOrder[mb.rare] - rarityOrder[ma.rare]) || ((b.enhance || 0) - (a.enhance || 0)) || (petPower(b) - petPower(a));
  });
}

const chapters = [
  ["新芽原野", "训练用的低阶野怪和资源点。"],
  ["电波山岭", "敌人速度提升，适合补控制。"],
  ["潮雾湖区", "防御型敌人增多，需要稳定输出。"],
  ["赤炉矿坑", "首领伤害较高，前排和治疗更重要。"],
  ["星辉遗迹", "综合检验阵容、星级和装备。"]
];

const enemyNames = [
  "巡游史莱姆", "蘑菇哨兵", "草叶盗团", "磁尾猎手", "雷鸣守卫", "浮空石偶", "泡影蟹", "湖雾祭司",
  "珊瑚卫兵", "熔岩球", "赤炉矿灵", "火蜥队长", "星尘斥候", "遗迹石像", "星辉守门者", "古代核心"
];

const stages = Array.from({ length: 40 }, (_, index) => {
  const id = index + 1;
  const chapter = Math.floor(index / 8);
  const step = index % 8 + 1;
  const boss = step === 8;
  const power = Math.floor(95 + id * 42 + Math.pow(id, 1.34) * 12 + (boss ? 130 + chapter * 55 : 0));
  return {
    id,
    chapter: chapter + 1,
    name: `${chapters[chapter][0]} ${step}`,
    enemy: boss ? `${chapters[chapter][0]}首领` : enemyNames[index % enemyNames.length],
    boss,
    power,
    reward: {
      gold: 42 + id * 16 + (boss ? 80 : 0),
      food: 26 + id * 9 + (boss ? 50 : 0),
      shard: boss ? 2 + chapter : id % 3 === 0 ? 1 : 0,
      gem: boss ? 10 + chapter * 4 : 0
    }
  };
});

const tasks = [
  { id: "claimIdle", type: "日常", title: "领取一次挂机收益", done: s => s.stats.idleClaims >= 1, reward: { gold: 160, food: 90 } },
  { id: "clear5", type: "成长", title: "通关第 5 关", done: s => s.clearedStage >= 5, reward: { ticket: 2, gem: 30 } },
  { id: "team3", type: "成长", title: "上阵 3 名伙伴", done: s => s.active.length >= 3, reward: { shard: 8 } },
  { id: "summon5", type: "日常", title: "累计召唤 5 次", done: s => s.stats.summons >= 5, reward: { ticket: 1, gold: 260 } },
  { id: "level10", type: "成长", title: "任意伙伴达到 10 级", done: s => s.roster.some(p => p.level >= 10), reward: { gem: 50, shard: 10 } },
  { id: "clear16", type: "成长", title: "击败第二章首领", done: s => s.clearedStage >= 16, reward: { ticket: 3, food: 600 } },
  { id: "tower5", type: "挑战", title: "试炼塔达到 5 层", done: s => s.towerFloor >= 5, reward: { gem: 80, shard: 12 } }
];

const state = {
  account: "",
  authMode: "login",
  screen: "auth",
  view: "home",
  summonTab: "pet",
  accountMenu: false,
  modal: "",
  data: null,
  log: [],
  ticker: null
};

const navItems = [
  ["home", "总览", "⌂"],
  ["idle", "挂机", "⏱"],
  ["campaign", "刷图", "⚔"],
  ["team", "阵容", "◆"],
  ["summon", "召唤", "✦"],
  ["equipment", "装备", "▣"],
  ["growth", "养成", "▲"],
  ["tasks", "任务", "✓"],
  ["shop", "商店", "◈"]
];

const resourceMeta = {
  gold: ["金币", "●", "训练、商店和基础强化消耗"],
  gem: ["钻石", "◆", "购买召唤券、体力和高级道具"],
  ticket: ["召唤", "✦", "用于抽取新的伙伴宝宝"],
  food: ["经验", "▲", "用于提升伙伴等级"],
  shard: ["星尘", "✧", "升星和装备强化材料"],
  stamina: ["体力", "⚡", "手动推图和快速扫荡消耗"],
  idle: ["挂机", "⏱", "当前可领取的离线/在线挂机时长"]
};

function uid() {
  return crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random()}`;
}

function createPet(mid, level = 1) {
  return { uid: uid(), mid, level, exp: 0, stars: 1, gear: 0, copies: 0, locked: false };
}

function createEquip(eid) {
  return { uid: uid(), eid, level: 0, petUid: "" };
}

function defaultSave(accountName, playerName, starter = "sprout") {
  const first = createPet(starter, 1);
  return {
    version: 2,
    accountName,
    name: playerName,
    title: "新晋训练师",
    gold: 980,
    gem: 120,
    ticket: 8,
    food: 420,
    shard: 18,
    protectCard: 0,
    boostCard: 0,
    stamina: 40,
    maxStamina: 40,
    clearedStage: 0,
    farmingStage: 1,
    active: [first.uid],
    roster: [first],
    equipment: [],
    claimed: [],
    usedCodes: [],
    battleRecords: [],
    inbox: [{ id: "welcome", title: "启程补给", reward: { ticket: 3, food: 300, gold: 500 } }],
    stats: { wins: 0, losses: 0, summons: 0, equipDraws: 0, idleClaims: 0, sweeps: 0, towerWins: 0 },
    towerFloor: 0,
    pity: 0,
    equipPity: 0,
    dailyDraw: { date: currentDateKey(), goldPet: 0 },
    lastIdleAt: Date.now(),
    lastStaminaAt: Date.now()
  };
}

function saveKey(account) {
  return `${STORAGE_PREFIX}${account}`;
}

function accountKey(account) {
  return `${ACCOUNT_PREFIX}${account}`;
}

function readAccount(account) {
  const raw = localStorage.getItem(accountKey(account));
  return raw ? JSON.parse(raw) : null;
}

function writeAccount(account, payload) {
  localStorage.setItem(accountKey(account), JSON.stringify(payload));
}

function hasGameSave(account) {
  return Boolean(localStorage.getItem(saveKey(account)));
}

function currentDateKey() {
  return new Date().toISOString().slice(0, 10);
}

function monster(mid) {
  return monsters.find(item => item.id === mid) || monsters[0];
}

function equipmentDef(eid) {
  return equipmentPool.find(item => item.id === eid) || equipmentPool[0];
}

function equipmentRareKey(item) {
  const rare = typeof item === "string" ? item : item?.rare;
  if (rare === "red" || rare === "orange" || rare === "SSR") return "SSR";
  if (rare === "purple" || rare === "SR") return "SR";
  if (rare === "blue" || rare === "R") return "R";
  return "N";
}

function stageById(id) {
  return stages.find(stage => stage.id === id) || stages[0];
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
  return ({ gold: "金币", gem: "星钻", ticket: "召唤券", food: "经验果", shard: "星尘", stamina: "体力", exp: "经验", protectCard: "防跌卡", boostCard: "幸运卡" })[key] || key;
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

function addLog(text) {
  state.log.unshift(`${new Date().toLocaleTimeString("zh-CN", { hour12: false })} ${text}`);
  state.log = state.log.slice(0, 36);
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
}

function activePets() {
  return state.data.roster.filter(pet => state.data.active.includes(pet.uid));
}

function petPower(pet) {
  const base = monster(pet.mid);
  const rarity = { N: 0.92, R: 1.02, SR: 1.16, SSR: 1.34, UR: 1.55 }[base.rare];
  const roleBonus = { guard: 1.08, support: 1.02, control: 1.04, strike: 1.08, blast: 1.1 }[base.role];
  const stat = base.hp * 0.34 + base.atk * 3.2 + base.def * 2.15 + base.spd * 1.65;
  const equipBonus = state.data?.equipment
    ?.filter(item => item.petUid === pet.uid)
    .reduce((sum, item) => sum + equipmentPower(item), 0) || 0;
  const enhanceBonus = (pet.enhance || 0) * (36 + (pet.enhance || 0) * 4);
  return Math.floor((stat + pet.level * 18 + pet.stars * 72 + pet.gear * 20 + enhanceBonus + equipBonus) * rarity * roleBonus);
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
  return {
    gold: Math.floor((22 + stage.id * 6) * powerRatio * (1 + speedBonus)),
    food: Math.floor((14 + stage.id * 4) * powerRatio),
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
  addLog(`领取 ${idle.minutes} 分钟挂机收益，${formatReward(idle.reward)}。`);
  persist();
  render();
}

function recoverStamina() {
  if (!state.data) return;
  const elapsed = Math.floor((Date.now() - state.data.lastStaminaAt) / (5 * 60000));
  if (elapsed > 0) {
    state.data.stamina = Math.min(state.data.maxStamina, state.data.stamina + elapsed);
    state.data.lastStaminaAt += elapsed * 5 * 60000;
  }
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
    if (state.data.stamina < 5) return false;
    state.data.stamina -= 5;
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

function autoCampaign() {
  let wins = 0;
  while (state.data.stamina >= 5 && state.data.clearedStage < stages.length) {
    const next = state.data.clearedStage + 1;
    const ok = challenge(next, { skipRender: true });
    if (!ok) break;
    wins += 1;
  }
  addLog(wins > 0 ? `自动主线完成，连续通关 ${wins} 关。` : "自动主线停止：战力不足或体力不足。");
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
  activePets().forEach(pet => {
    pet.exp += amount;
    while (pet.exp >= expNeed(pet.level) && pet.level < 80) {
      pet.exp -= expNeed(pet.level);
      pet.level += 1;
      addLog(`${monster(pet.mid).name} 升到 ${pet.level} 级。`);
    }
  });
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
    results.push(`${picked.rare}${picked.name}`);
  }
  state.data.stats.summons += count;
  addLog(`${pool === "gold" ? "金币宠物抽奖" : pool === "gem" ? "钻石宠物抽奖" : "召唤券抽奖"} ${count} 次：${results.slice(0, 5).join("、")}${results.length > 5 ? " 等" : ""}。`);
  persist();
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
    const pool = equipmentPool.filter(item => item.rare === rare);
    const picked = pool[Math.floor(Math.random() * pool.length)] || equipmentPool[0];
    state.data.equipment.push(createEquip(picked.id));
    results.push(`${equipmentRarity[equipmentRareKey(picked)].name}${picked.name}`);
  }
  state.data.stats.equipDraws += count;
  addLog(`装备抽奖 ${count} 次：${results.slice(0, 5).join("、")}${results.length > 5 ? " 等" : ""}。`);
  persist();
  render();
}

function setSummonTab(tab) {
  state.summonTab = tab;
  render();
}

function equipItem(petUid, equipUid) {
  const item = state.data.equipment.find(equip => equip.uid === equipUid);
  if (!item) return;
  item.petUid = item.petUid === petUid ? "" : petUid;
  addLog(`${equipmentDef(item.eid).name}${item.petUid ? "已穿戴" : "已卸下"}。`);
  persist();
  render();
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
    stamina: { cost: { gem: 50 }, reward: { stamina: 20 } },
    shard: { cost: { gold: 420 }, reward: { shard: 5 } },
    food: { cost: { gold: 360 }, reward: { food: 500 } },
    protectCard: { cost: { gem: 120 }, reward: { protectCard: 1 } },
    boostCard: { cost: { gem: 80 }, reward: { boostCard: 1 } }
  };
  const offer = offers[item];
  if (!offer) return;
  if (Object.entries(offer.cost).some(([key, value]) => state.data[key] < value)) return;
  Object.entries(offer.cost).forEach(([key, value]) => state.data[key] -= value);
  applyReward(offer.reward);
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
  el.innerHTML = `
    <div class="account-wrap">
      <button class="player-profile" title="${state.data.name}｜${state.account}｜${state.data.title}｜战力 ${formatNum(teamPower())}" onclick="toggleAccountMenu()">
        <div class="avatar">${initial}</div>
        <div class="player-copy">
          <strong>${state.data.name}</strong>
          <span>${state.data.title} · 战力 ${formatNum(teamPower())}</span>
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
  const idle = pendingIdle();
  const rows = [
    ["gold", state.data.gold],
    ["gem", state.data.gem],
    ["ticket", state.data.ticket],
    ["food", state.data.food],
    ["shard", state.data.shard],
    ["stamina", `${state.data.stamina}/${state.data.maxStamina}`],
    ["idle", `${idle.minutes} 分`]
  ];
  el.innerHTML = rows.map(([key, value]) => {
    const [name, icon, note] = resourceMeta[key];
    const display = typeof value === "number" ? formatNum(value) : value;
    return `
      <div class="resource compact-tip" tabindex="0" aria-label="${name} ${display}。${note}" title="${name}：${note}" data-tip="${name}｜${note}">
        <i aria-hidden="true">${icon}</i>
        <span>${name}</span>
        <strong>${display}</strong>
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
  const activeNames = activePets().map(pet => monster(pet.mid).name).join("、") || "暂无上阵伙伴";
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
              <p>${activeNames}</p>
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
    recharge: `
      <section class="modal-card narrow-modal">
        ${close}
        <div class="modal-head"><div><h2>钻石充值</h2><p>当前为本地原型模拟充值，不包含真实支付。</p></div></div>
        <div class="recharge-grid">
          <button onclick="rechargeDiamonds(120, '月光小包')"><strong>120 钻石</strong><span>月光小包</span></button>
          <button onclick="rechargeDiamonds(680, '星辉礼包')"><strong>680 钻石</strong><span>星辉礼包</span></button>
          <button onclick="rechargeDiamonds(1980, '远征补给')"><strong>1,980 钻石</strong><span>远征补给</span></button>
        </div>
      </section>
    `,
    enhanceGuide: `
      <section class="modal-card guide-modal">
        ${close}
        <div class="modal-head"><div><h2>强化指南</h2><p>每次强化消耗 1 个重复宠物。幸运卡成功率 +15%，最高显示 95%。+10 之后失败可能 -1，防跌卡可防止掉级。</p></div></div>
        <div class="guide-grid">
          ${enhanceGuideRows().map(row => `
            <article class="guide-card ${rarityBorderClass(row.rare)}">
              <div class="guide-title"><i class="${rarityClass(row.rare)}">${row.rare}</i><strong>最高 +${row.max}</strong></div>
              <div class="guide-rates">
                ${row.rates.map((rate, index) => `<span>+${index} → +${index + 1}<b>${rate}%</b></span>`).join("")}
              </div>
            </article>
          `).join("")}
        </div>
      </section>
    `
  }[state.modal] || "";
  el.innerHTML = `<div class="modal-backdrop" onclick="closeModal()"><div onclick="event.stopPropagation()">${content}</div></div>`;
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

function petCard(pet, compact = false) {
  const base = monster(pet.mid);
  const active = state.data.active.includes(pet.uid);
  const cost = levelCost(pet);
  const scost = starCost(pet);
  const need = expNeed(pet.level);
  const equipped = petEquipList(pet.uid);
  const maxEnhance = enhanceMax(pet);
  const rate = enhanceRate(pet);
  const boostRate = enhanceRate(pet, true);
  const enhanceDone = (pet.enhance || 0) >= maxEnhance;
  return `
    <article class="card pet-card ${rarityBorderClass(base.rare)} ${active ? "selected" : ""}">
      <div class="pet-title">
        <div>
          <strong>${base.name}</strong>
          <span>${elements[base.element]}系 · ${roles[base.role]}</span>
        </div>
        <i class="${rarityClass(base.rare)}">${base.rare}</i>
      </div>
      ${compact ? "" : `<p class="muted">${base.skill}：${base.bio}</p>`}
      <div class="stat-grid">
        <div><span>等级</span><b>${pet.level}</b></div>
        <div><span>星级</span><b>${pet.stars}</b></div>
        <div><span>强化</span><b>+${pet.enhance || 0}/${maxEnhance}</b></div>
        <div><span>战力</span><b>${formatNum(petPower(pet))}</b></div>
      </div>
      <div class="bar"><i style="width:${Math.min(100, pet.exp / need * 100)}%"></i></div>
      <div class="actions">
        <button class="${active ? "primary" : ""}" onclick="toggleActive('${pet.uid}')">${active ? "已上阵" : "上阵"}</button>
        <button onclick="train('${pet.uid}')" ${state.data.food < cost.food || state.data.gold < cost.gold ? "disabled" : ""}>升级</button>
        <button onclick="starUp('${pet.uid}')" ${pet.stars >= 6 || state.data.shard < scost.shard || pet.copies < scost.copies ? "disabled" : ""}>升星</button>
        <button onclick="state.view='equipment';render()">装备</button>
        <button onclick="enhancePet('${pet.uid}')" ${enhanceDone || pet.copies < 1 ? "disabled" : ""}>强化 ${rate}%</button>
        <button onclick="enhancePet('${pet.uid}', true, false)" ${enhanceDone || pet.copies < 1 || state.data.protectCard < 1 ? "disabled" : ""}>防跌</button>
        <button onclick="enhancePet('${pet.uid}', false, true)" ${enhanceDone || pet.copies < 1 || state.data.boostCard < 1 ? "disabled" : ""}>幸运 ${boostRate}%</button>
      </div>
      <p class="cost-line">升级 ${formatNum(cost.food)} 果/${formatNum(cost.gold)} 金 · 升星 ${scost.copies} 碎片/${scost.shard} 星尘 · 重复宠物 ${pet.copies} · 防跌卡 ${state.data.protectCard} · 幸运卡 ${state.data.boostCard}${equipped.length ? ` · 穿戴 ${equipped.map(item => equipmentDef(item.eid).name).join("、")}` : ""}</p>
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
  const next = stageById(Math.min(stages.length, state.data.clearedStage + 1));
  return `
    ${viewShell("训练师大厅", "从注册选初始伙伴开始，核心循环是挂机收益、刷图解锁、召唤扩充阵容、养成后继续推图。", `<button class="primary" onclick="state.view='idle';render()">查看挂机</button>`)}
    <div class="summary-grid">
      <section class="metric"><span>通关进度</span><strong>${state.data.clearedStage}/${stages.length}</strong><p>${chapters[Math.floor(Math.max(0, state.data.clearedStage - 1) / 8)]?.[0] || chapters[0][0]}</p></section>
      <section class="metric"><span>队伍战力</span><strong>${formatNum(teamPower())}</strong><p>下一关推荐 ${formatNum(next.power)}</p></section>
      <section class="metric"><span>伙伴数量</span><strong>${state.data.roster.length}/${monsters.length}</strong><p>上阵 ${state.data.active.length}/5</p></section>
      <section class="metric"><span>待领挂机</span><strong>${idle.minutes} 分钟</strong><p>${formatReward(idle.reward) || "暂无收益"}</p></section>
    </div>
    <div class="grid two">
      <section class="card">
        <h3>当前阵容</h3>
        <div class="team-row">${activePets().map(pet => `<span>${monster(pet.mid).name}<b>${formatNum(petPower(pet))}</b></span>`).join("")}</div>
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

function renderIdle() {
  const idle = pendingIdle();
  const stage = stageById(state.data.farmingStage);
  const rate = idleRate();
  const farmOptions = stages.filter(item => item.id <= Math.max(1, state.data.clearedStage));
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
          <div><span>累计</span><b>${idle.minutes} 分</b></div>
        </div>
        <div class="actions">
          <button onclick="sweep()" ${state.data.stamina < 3 ? "disabled" : ""}>快速扫荡</button>
          <button onclick="challenge(${Math.min(stages.length, state.data.clearedStage + 1)})" ${state.data.stamina < 5 ? "disabled" : ""}>挑战下一关</button>
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
  const nextId = Math.min(stages.length, state.data.clearedStage + 1);
  const nextStage = stageById(nextId);
  const nextElement = stageElement(nextStage);
  const nextAdv = elementAdvantage(nextElement);
  const towerFloor = state.data.towerFloor + 1;
  const towerPower = Math.floor(260 + towerFloor * 96 + Math.pow(towerFloor, 1.35) * 18);
  const towerEl = towerElement(towerFloor);
  const towerAdv = elementAdvantage(towerEl);
  const recent = state.data.battleRecords || [];
  return `
    ${viewShell("闯关", "主线和试炼塔放在这里统一挑战。看当前目标、推荐战力和预计胜率即可；自动闯关会打到失败或资源不足后停止。")}
    <div class="adventure-grid">
      <section class="card adventure-card">
        <div class="adventure-head"><div><span>主线</span><h3>${nextStage.id}. ${nextStage.enemy}</h3><p>${nextStage.name} · ${elementName(nextElement)}系 · ${nextAdv.text}</p></div><strong>${state.data.clearedStage}/${stages.length}</strong></div>
        <div class="stat-grid">
          <div><span>推荐战力</span><b>${formatNum(nextStage.power)}</b></div>
          <div><span>队伍战力</span><b>${formatNum(teamPower())}</b></div>
          <div><span>预计胜率</span><b>${battleChance(nextStage.power, nextElement)}%</b></div>
          <div><span>体力消耗</span><b>5</b></div>
        </div>
        <p class="muted">胜利后自动推进到下一关，并把挂机地点推进到最新关卡。</p>
        <div class="actions">
          <button class="primary" onclick="challenge(${nextId})" ${state.data.stamina < 5 || state.data.clearedStage >= stages.length ? "disabled" : ""}>挑战下一关</button>
          <button onclick="autoCampaign()" ${state.data.stamina < 5 || state.data.clearedStage >= stages.length ? "disabled" : ""}>自动主线</button>
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
    ${viewShell("阵容编成", "最多上阵 5 名伙伴。建议保留前排、输出、辅助或控制，队伍元素和定位越丰富会有少量协同加成。")}
    <div class="formation-bar">${[0, 1, 2, 3, 4].map(i => {
      const pet = activePets()[i];
      return `<div class="slot">${pet ? `<strong>${monster(pet.mid).name}</strong><span>${formatNum(petPower(pet))}</span>` : `<span>空位</span>`}</div>`;
    }).join("")}</div>
    <div class="grid three">${sorted.map(pet => petCard(pet, true)).join("")}</div>
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
            <div class="rate-row"><span>N 28%</span><span>R 40%</span><span>SR 24%</span><span>SSR 6.5%</span><span>UR 1.5%</span></div>
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
          <p>装备分 N、R、SR、SSR 四档，可在装备界面给伙伴穿戴。</p>
          <div class="rate-row"><span>N 42%</span><span>R 32%</span><span>SR 20%</span><span>SSR 6%</span></div>
        </div>
        <div class="actions inline"><button class="primary" onclick="drawEquipment(1)" ${state.data.gem < 60 ? "disabled" : ""}>装备抽 1 次 · 60</button><button onclick="drawEquipment(10)" ${state.data.gem < 520 ? "disabled" : ""}>装备抽 10 次 · 520</button><button onclick="state.view='equipment';render()">查看装备</button></div>
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
  const items = [...state.data.equipment].sort((a, b) => equipmentPower(b) - equipmentPower(a));
  const roster = [...state.data.roster].sort((a, b) => petPower(b) - petPower(a));
  return `
    ${viewShell("装备背包", "装备通过装备抽奖获得，按颜色区分品质。选择伙伴后点击穿戴，同一件装备可随时卸下或换人。", `<button class="primary" onclick="state.view='summon';state.summonTab='equipment';render()">去装备抽奖</button>`)}
    <div class="summary-grid">
      <section class="metric"><span>装备数量</span><strong>${items.length}</strong><p>已穿戴 ${items.filter(item => item.petUid).length}</p></section>
      <section class="metric"><span>最高品质</span><strong>${items[0] ? equipmentRarity[equipmentRareKey(equipmentDef(items[0].eid))].name : "-"}</strong><p>${items[0] ? equipmentDef(items[0].eid).name : "暂无装备"}</p></section>
      <section class="metric"><span>装备抽数</span><strong>${state.data.stats.equipDraws}</strong><p>累计装备抽取次数</p></section>
      <section class="metric"><span>队伍战力</span><strong>${formatNum(teamPower())}</strong><p>装备会计入伙伴战力</p></section>
    </div>
    ${items.length ? `
      <div class="collection-grid">
        ${items.map(item => {
          const def = equipmentDef(item.eid);
          const wearer = state.data.roster.find(pet => pet.uid === item.petUid);
          return `
            <article class="card equip-card ${equipBorderClass(def.rare)}">
              <div class="pet-title"><div><strong>${def.name}</strong><span>${def.slot} · ${wearer ? `穿戴者 ${monster(wearer.mid).name}` : "未穿戴"}</span></div><i class="${equipRareClass(def.rare)}">${equipmentRarity[equipmentRareKey(def)].name}</i></div>
              <p>${def.desc}</p>
              <div class="mini-stats"><span>HP ${def.hp}</span><span>攻 ${def.atk}</span><span>防 ${def.def}</span><span>战力 ${equipmentPower(item)}</span></div>
              <div class="equip-control">
                <select id="equipTarget-${item.uid}">
                  <option value="">卸下/不穿戴</option>
                  ${roster.map(pet => `<option value="${pet.uid}" ${pet.uid === item.petUid ? "selected" : ""}>${monster(pet.mid).name} · ${formatNum(petPower(pet))}</option>`).join("")}
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
  return `
    ${viewShell("伙伴养成", "重复宠物可用于强化，稀有度越高上限越高。+10 之后失败可能掉级，可使用防跌卡和幸运卡降低风险。", `<button onclick="openModal('enhanceGuide')">强化指南</button>`)}
    <div class="summary-grid">
      <section class="metric"><span>试炼塔</span><strong>${state.data.towerFloor} 层</strong><p>下一层推荐 ${formatNum(260 + (state.data.towerFloor + 1) * 96)}</p></section>
      <section class="metric"><span>最高等级</span><strong>${Math.max(...state.data.roster.map(p => p.level))}</strong><p>等级上限 80</p></section>
      <section class="metric"><span>最高星级</span><strong>${Math.max(...state.data.roster.map(p => p.stars))}</strong><p>星级上限 6</p></section>
      <section class="metric"><span>最高强化</span><strong>+${Math.max(...state.data.roster.map(p => p.enhance || 0))}</strong><p>防跌卡 ${state.data.protectCard} · 幸运卡 ${state.data.boostCard}</p></section>
    </div>
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
            <button class="primary" onclick="claimTask('${task.id}')" ${!done || claimed ? "disabled" : ""}>${claimed ? "已领取" : done ? "领取" : "未完成"}</button>
          </article>
        `;
      }).join("")}
    </div>
  `;
}

function renderShop() {
  const items = [
    ["ticket", "召唤券", "用于抽取新伙伴或重复碎片", "星钻 90"],
    ["stamina", "体力包", "用于快速扫荡和手动推图", "星钻 50"],
    ["shard", "星尘包", "升星和装备强化材料", "金币 420"],
    ["food", "经验果箱", "快速提升伙伴等级", "金币 360"],
    ["protectCard", "防跌卡", "+10 之后强化失败时防止等级 -1", "星钻 120"],
    ["boostCard", "幸运卡", "本次强化成功率 +15%", "星钻 80"]
  ];
  return `
    ${viewShell("商店", "当前为单机试玩商店，只消耗游戏内资源，不包含充值或联网支付。", `<button class="warn" onclick="resetSave()">重置存档</button>`)}
    <div class="grid two">
      ${items.map(([id, name, text, price]) => `
        <article class="card shop-row">
          <div><h3>${name}</h3><p>${text}</p><span>${price}</span></div>
          <button onclick="buy('${id}')">购买</button>
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
    summon: renderSummon,
    equipment: renderEquipment,
    growth: renderGrowth,
    tasks: renderTasks,
    shop: renderShop
  };
  el.innerHTML = views[state.view]();
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
