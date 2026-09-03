/* ============================================================
   《毕业留念》9 人数据
   ============================================================ */

const GRADUATION_DATA = {
  school: '河北地质大学',
  college: '信息工程学院',
  major: '电子信息工程',
  period: '2022.09 — 2026.06',
  motto: '共赴山海 以此为念',
  mainPhrase: '毕业留念 共赴长天',
  from: '康辉赠',

  members: [
    {
      id: 'kanghui',
      name: '康辉',
      nickname: '聪明老头儿',
      blessing: '康途万里，逐梦扬辉。',
      memory: '康辉你是个聪明老头儿！',
      photo: 'assets/photos/kanghui.jpg',
      // 专属意象：辉光 → 光粒偏暖金
      accent: 'warm-glow',
      keywords: ['康途', '万里', '逐梦', '扬辉'],
      orientation: 'landscape',
      isHost: true
    },
    {
      id: 'liujiaxin',
      name: '刘嘉欣',
      nickname: '夹心',
      blessing: '嘉友常伴，岁岁同欣。',
      memory: '夹心，保重身体，多多冒泡！',
      photo: 'assets/photos/liujiaxin.jpg',
      accent: 'starlight',
      keywords: ['嘉友', '常伴', '岁岁', '同欣'],
      orientation: 'landscape'
    },
    {
      id: 'dingjintian',
      name: '丁金天',
      nickname: '天哥',
      blessing: '金兰同路，共赴长天。',
      memory: '天哥挥笔生花问桀骜也敢与月争高！',
      photo: 'assets/photos/dingjintian.jpg',
      accent: 'skyscape',
      keywords: ['金兰', '同路', '共赴', '长天'],
      orientation: 'portrait'
    },
    {
      id: 'chengshoulin',
      name: '程首霖',
      nickname: '首霖',
      blessing: '首望前路，霖润初心。',
      memory: '别忘了咱的自驾驾驾计划！',
      photo: 'assets/photos/chengshoulin.jpg',
      accent: 'rain',
      keywords: ['首望', '前路', '霖润', '初心'],
      orientation: 'landscape'
    },
    {
      id: 'wangyinghan',
      name: '王映涵',
      nickname: '硬汉',
      blessing: '映日生辉，涵宇纳川。',
      memory: '硬汉咱就得一战上岸！',
      photo: 'assets/photos/wangyinghan.jpg',
      accent: 'sunrise',
      keywords: ['映日', '生辉', '涵宇', '纳川'],
      orientation: 'portrait'
    },
    {
      id: 'wangchunze',
      name: '王春泽',
      nickname: '春泽',
      blessing: '春华秋实，泽厚流光。',
      memory: 'best wish给你，欧气冲天，次次出金！',
      photo: 'assets/photos/wangchunze.jpg',
      accent: 'spring',
      keywords: ['春华', '秋实', '泽厚', '流光'],
      orientation: 'landscape'
    },
    {
      id: 'zhangluyang',
      name: '张璐阳',
      nickname: '璐阳',
      blessing: '琼瑶满璐，步暖晨阳。',
      memory: '贯穿四年的饭搭子话搭子玩搭子！',
      photo: 'assets/photos/zhangluyang.jpg',
      accent: 'sunwarm',
      keywords: ['琼瑶', '满璐', '步暖', '晨阳'],
      orientation: 'portrait'
    },
    {
      id: 'yanbingxue',
      name: '晏冰雪',
      nickname: '冰雪',
      blessing: '冰壶秋月，雪映芳华。',
      memory: '冰雪聪敏简直是我们大剪辑师的定制词！',
      photo: 'assets/photos/yanbingxue.jpg',
      accent: 'snow',
      keywords: ['冰壶', '秋月', '雪映', '芳华'],
      orientation: 'portrait'
    },
    {
      id: 'wangyaran',
      name: '王亚然',
      nickname: '亚然',
      blessing: '亚枝新蕊，然然自若。',
      memory: '从心所欲不逾矩，最然然自得之人！',
      photo: 'assets/photos/wangyaran.jpg',
      accent: 'bloom',
      keywords: ['亚枝', '新蕊', '然然', '自若'],
      orientation: 'portrait'
    }
  ]
};

// 按 id 获取成员数据
function getMemberById(id) {
  return GRADUATION_DATA.members.find(m => m.id === id);
}

// 导出（浏览器环境下挂到 window）
if (typeof window !== 'undefined') {
  window.GRADUATION_DATA = GRADUATION_DATA;
  window.getMemberById = getMemberById;
}
