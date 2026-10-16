export interface TeaReview {
  id: string;
  author: string;
  rating: number;
  date: string;
  content: string;
  flowerTeaName: string;
  helpfulCount: number;
  photoUrl?: string;
  tags?: string[];
}

export interface TeaProduct {
  id: string;
  name: string;
  koreanSubtitle: string;
  englishName: string;
  category: 'single' | 'blend' | 'gift' | 'teaware';
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  image: string;
  detailImages: string[];
  badge?: string;
  flowerType: string;
  liquorColor: {
    hex: string;
    name: string;
    description: string;
  };
  scentProfile: {
    sweetness: number; // 1-5
    aroma: number; // 1-5
    body: number; // 1-5
    clarity: number; // 1-5
    notes: string[];
  };
  effects: string[];
  caffeineFree: boolean;
  origin: string;
  capacity: string;
  brewing: {
    waterTemp: string;
    steepTime: string;
    servings: string;
    tip: string;
  };
  description: string;
  story: string;
  ingredients: string;
  packagingOptions: string[];
  reviews: TeaReview[];
}

export const TEA_PRODUCTS: TeaProduct[] = [
  {
    id: 'tea-magnolia',
    name: '지리산 백목련 꽃차',
    koreanSubtitle: '봄날의 은은한 햇살과 알싸한 상쾌함',
    englishName: 'Artisan Magnolia Flower Tea',
    category: 'single',
    price: 24000,
    originalPrice: 28000,
    rating: 4.95,
    reviewCount: 342,
    badge: '시그니처',
    flowerType: '목련 (Magnolia)',
    image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?q=80&w=900&auto=format&fit=crop',
    detailImages: [
      'https://images.unsplash.com/photo-1576092768241-dec231879fc3?q=80&w=900&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1544787219-7f47ccb76574?q=80&w=900&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1594631252845-29fc4cc8cde9?q=80&w=900&auto=format&fit=crop'
    ],
    liquorColor: {
      hex: '#FBE9B8',
      name: '맑은 미색 옥빛',
      description: '물에 닿자마자 맑고 투명한 연노랑에서 영롱한 옥빛으로 피어납니다.'
    },
    scentProfile: {
      sweetness: 3,
      aroma: 5,
      body: 3,
      clarity: 5,
      notes: ['시원한 박하향', '달콤한 바닐라 향', '은은한 스파이시']
    },
    effects: ['호흡기/비염 완화', '환절기 목 보호', '심신 안정'],
    caffeineFree: true,
    origin: '대한민국 전남 구례 지리산 자락 (100% 무농약)',
    capacity: '12g (유리병 보관용 / 약 20~25회분)',
    brewing: {
      waterTemp: '95℃ ~ 100℃',
      steepTime: '3분 ~ 4분',
      servings: '꽃 1송이로 3회 이상 우림 가능',
      tip: '유리 다기에 꽃송이를 띄우면 찻물 속에서 하얀 꽃잎이 활짝 펼쳐집니다.'
    },
    description: '이른 봄 가장 먼저 피어난 백목련의 탐스러운 봉오리만을 엄선하여 아홉 번 덖고 아홉 번 말린(구증구포) 화담의 대표 시그니처 꽃차입니다.',
    story: '봄이 오기 직전, 칼바람 속에서 맺힌 어린 목련 꽃봉오리에는 한 해의 순수한 생명력이 깃들어 있습니다. 목련의 매운 기운인 신이화(辛夷花)의 성질을 온화하게 다스리기 위해 저온 덖음 과정을 정성스레 거쳤습니다. 입안 가득 감도는 상쾌하고 달콤한 여운을 느껴보세요.',
    ingredients: '국내산 백목련 꽃 100%',
    packagingOptions: ['단품 유리병', '선물용 린넨 파우치 (+2,000원)', '전통 비단 보자기 포장 (+5,000원)'],
    reviews: [
      {
        id: 'rev-1',
        author: '김*은',
        rating: 5,
        date: '2026.10.12',
        content: '환절기마다 비염으로 고생하는데 목련차 마시고 목이 너무 편안해졌어요. 물을 부으면 꽃잎이 서서히 만개하는데 눈으로 보는 즐거움이 예술입니다.',
        flowerTeaName: '지리산 백목련 꽃차',
        helpfulCount: 28,
        tags: ['비염완화', '힐링향기', '재구매']
      },
      {
        id: 'rev-2',
        author: '박*하',
        rating: 5,
        date: '2026.10.08',
        content: '부모님께 보자기 포장으로 선물해드렸는데, 포장도 너무 정갈하고 맛도 깔끔하시다며 너무 좋아하셨어요! 박하처럼 시원한 첫맛과 바닐라 같은 끝맛이 특별합니다.',
        flowerTeaName: '지리산 백목련 꽃차',
        helpfulCount: 19
      }
    ]
  },
  {
    id: 'tea-marigold',
    name: '황금 노을 메리골드(금잔화) 꽃차',
    koreanSubtitle: '침침한 눈에 선물하는 황금빛 휴식',
    englishName: 'Golden Sunset Marigold Tea',
    category: 'single',
    price: 22000,
    originalPrice: 25000,
    rating: 4.98,
    reviewCount: 512,
    badge: '베스트 1위',
    flowerType: '메리골드 (Marigold)',
    image: 'https://images.unsplash.com/photo-1597481499750-3e6b22637e12?q=80&w=900&auto=format&fit=crop',
    detailImages: [
      'https://images.unsplash.com/photo-1597481499750-3e6b22637e12?q=80&w=900&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?q=80&w=900&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=900&auto=format&fit=crop'
    ],
    liquorColor: {
      hex: '#F59E0B',
      name: '풍요로운 황금 주황빛',
      description: '가을 노을을 한 모금 담아낸 듯 찬란한 황금 오렌지빛 수색입니다.'
    },
    scentProfile: {
      sweetness: 4,
      aroma: 4,
      body: 4,
      clarity: 4,
      notes: ['그윽한 국화향', '달큰한 꿀맛', '고소한 덖음 내음']
    },
    effects: ['루테인 눈 건강', '스마트폰 눈 피로', '항산화 활력'],
    caffeineFree: true,
    origin: '대한민국 경북 안동 유기농 화원',
    capacity: '15g (유리병 보관용 / 약 30회분)',
    brewing: {
      waterTemp: '90℃ ~ 95℃',
      steepTime: '2분 30초',
      servings: '꽃송이 1~2개 또는 꽃잎 1티스푼',
      tip: '뜨거운 물을 부은 뒤 수색이 번져가는 모습을 바라보며 눈의 긴장을 풀어보세요.'
    },
    description: '눈에 좋은 루테인과 지아잔틴이 풍부한 메리골드를 꽃잎 한 장 한 장 손질하여 고소하고 달큰하게 덖어낸 스테디셀러 꽃차입니다.',
    story: '모니터와 스마트폰을 종일 마주하는 현대인들을 위해 준비한 차입니다. 안동의 맑은 볕을 받고 자란 만개 직전의 메리골드는 쓴맛 없이 은은하고 구수한 풍미를 선사합니다. 저녁 퇴근 후 찻잔에 일렁이는 황금빛 노을을 만나보세요.',
    ingredients: '국내산 메리골드 꽃 100%',
    packagingOptions: ['단품 유리병', '선물용 린넨 파우치 (+2,000원)', '전통 비단 보자기 포장 (+5,000원)'],
    reviews: [
      {
        id: 'rev-3',
        author: '이*훈',
        rating: 5,
        date: '2026.10.14',
        content: '하루 종일 코딩하느라 눈이 너무 뻑뻑했는데 메리골드차 마신 지 2주째, 눈 피로가 눈에 띄게 덜해요. 색깔도 너무 곱고 고소해서 매일 텀블러에 우려 마십니다.',
        flowerTeaName: '황금 노을 메리골드 꽃차',
        helpfulCount: 42,
        tags: ['직장인필수', '눈피로개선', '고소한풍미']
      }
    ]
  },
  {
    id: 'tea-cockscomb',
    name: '루비빛 맨드라미 꽃차',
    koreanSubtitle: '매혹적인 붉은 수색과 온화한 힐링',
    englishName: 'Artisanal Ruby Cockscomb Tea',
    category: 'single',
    price: 23000,
    originalPrice: 26000,
    rating: 4.91,
    reviewCount: 228,
    badge: '인기 수색',
    flowerType: '맨드라미 (Cockscomb)',
    image: 'https://images.unsplash.com/photo-1509358271058-acd22cc93898?q=80&w=900&auto=format&fit=crop',
    detailImages: [
      'https://images.unsplash.com/photo-1509358271058-acd22cc93898?q=80&w=900&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1544787219-7f47ccb76574?q=80&w=900&auto=format&fit=crop'
    ],
    liquorColor: {
      hex: '#BE123C',
      name: '매혹적인 루비 레드',
      description: '단 한 잎으로도 찻잔을 붉은 보석처럼 물들이는 신비로운 수색입니다.'
    },
    scentProfile: {
      sweetness: 3,
      aroma: 3,
      body: 4,
      clarity: 5,
      notes: ['담백하고 구수한 곡물향', '은은한 흙내음', '부드러운 목넘김']
    },
    effects: ['여성 건강 케어', '혈액 순환', '피부 생기 충전'],
    caffeineFree: true,
    origin: '대한민국 전북 남원 청정 화원',
    capacity: '15g (유리병 보관용 / 약 25회분)',
    brewing: {
      waterTemp: '95℃ ~ 100℃',
      steepTime: '2분 ~ 3분',
      servings: '꽃 1티스푼 (약 0.5g)',
      tip: '차가운 탄산수나 얼음을 띄워 아이스티나 칵테일 베이스로 즐기셔도 훌륭합니다.'
    },
    description: '타오르는 붉은 열정을 닮은 맨드라미는 옛 선조들이 귀한 손님맞이에 올리던 다도화입니다. 따뜻한 성질을 지녀 몸을 편안히 데워줍니다.',
    story: '남원의 가을 들판에서 탐스럽게 자란 맨드라미 꽃잎을 정성껏 덖어 독성을 제거하고 구수한 깊은 맛만을 남겼습니다. 투명한 유리잔에 담긴 붉은 루비빛은 보는 것만으로도 마음의 위안과 설렘을 전합니다.',
    ingredients: '국내산 맨드라미 꽃 100%',
    packagingOptions: ['단품 유리병', '선물용 린넨 파우치 (+2,000원)', '전통 비단 보자기 포장 (+5,000원)'],
    reviews: [
      {
        id: 'rev-4',
        author: '최*민',
        rating: 5,
        date: '2026.09.29',
        content: '수색이 정말 미쳤어요... 손님들 오셨을 때 유리잔에 대접하니 다들 사진 찍고 어디서 샀냐고 물어보시네요. 맛도 자극적이지 않고 숭늉처럼 편안합니다.',
        flowerTeaName: '루비빛 맨드라미 꽃차',
        helpfulCount: 31
      }
    ]
  },
  {
    id: 'tea-chrysanthemum',
    name: '청정 고운 구절초 꽃차',
    koreanSubtitle: '가을 이슬 머금은 순백의 편안함',
    englishName: 'Pure Chrysanthemum Zawadskii Tea',
    category: 'single',
    price: 25000,
    originalPrice: 29000,
    rating: 4.96,
    reviewCount: 418,
    badge: '숙면 추천',
    flowerType: '구절초 (Korean Daisy)',
    image: 'https://images.unsplash.com/photo-1507290439931-a861b5a38200?q=80&w=900&auto=format&fit=crop',
    detailImages: [
      'https://images.unsplash.com/photo-1507290439931-a861b5a38200?q=80&w=900&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?q=80&w=900&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1544787219-7f47ccb76574?q=80&w=900&auto=format&fit=crop'
    ],
    liquorColor: {
      hex: '#FDE047',
      name: '맑은 레몬 골드빛',
      description: '투명하고 청명한 가을 하늘처럼 맑은 연노랑빛을 띱니다.'
    },
    scentProfile: {
      sweetness: 4,
      aroma: 5,
      body: 3,
      clarity: 5,
      notes: ['그윽한 들국화향', '풀잎의 싱그러움', '달콤한 꿀 뒷맛']
    },
    effects: ['깊은 숙면 유도', '생리통 완화', '스트레스 이완'],
    caffeineFree: true,
    origin: '대한민국 강원도 정선 해발 700m 고랭지',
    capacity: '15g (유리병 보관용 / 약 25회분)',
    brewing: {
      waterTemp: '90℃',
      steepTime: '3분',
      servings: '꽃 2~3송이',
      tip: '잠들기 1시간 전, 따스하게 우려 깊은 숨과 함께 마시면 편안한 잠자리에 도움이 됩니다.'
    },
    description: '음력 9월 9일에 꺾는 풀이라 하여 이름 붙은 구절초. 여성의 몸을 따뜻하게 보호하며 지친 신경을 평온하게 감싸주는 한국 전통 야생화 차입니다.',
    story: '정선 고원지대의 청정한 솔바람과 이슬을 맞고 자란 토종 구절초만을 채취했습니다. 일반 국화차와 달리 쓰거나 텁텁하지 않고, 맑고 달큰한 국화향이 혀끝을 스치며 밤의 긴장을 스르르 녹여냅니다.',
    ingredients: '국내산 구절초 꽃 100%',
    packagingOptions: ['단품 유리병', '선물용 린넨 파우치 (+2,000원)', '전통 비단 보자기 포장 (+5,000원)'],
    reviews: [
      {
        id: 'rev-5',
        author: '윤*주',
        rating: 5,
        date: '2026.10.02',
        content: '불면증 때문에 따뜻한 물만 마시다가 구절초차를 접했는데 매일 밤 저의 소확행이 되었습니다. 마시는 순간 머리가 맑아지면서 편안해져요.',
        flowerTeaName: '청정 고운 구절초 꽃차',
        helpfulCount: 35
      }
    ]
  },
  {
    id: 'tea-acacia',
    name: '달콤한 추억 아카시아 꽃차',
    koreanSubtitle: '입안 가득 번지는 봄날의 꿀향기',
    englishName: 'Sweet Acacia Blossom Tea',
    category: 'single',
    price: 21000,
    originalPrice: 24000,
    rating: 4.88,
    reviewCount: 189,
    badge: '달콤한 향기',
    flowerType: '아카시아 (Acacia)',
    image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?q=80&w=900&auto=format&fit=crop',
    detailImages: [
      'https://images.unsplash.com/photo-1544787219-7f47ccb76574?q=80&w=900&auto=format&fit=crop'
    ],
    liquorColor: {
      hex: '#FEF08A',
      name: '연한 살구빛 샴페인',
      description: '부드러운 햇살을 머금은 맑은 아이보리 살구빛 수색을 자랑합니다.'
    },
    scentProfile: {
      sweetness: 5,
      aroma: 5,
      body: 2,
      clarity: 4,
      notes: ['천연 꿀향', '화사한 꽃잎 아로마', '산뜻한 플로럴']
    },
    effects: ['부종 완화', '이뇨 작용', '염증 케어'],
    caffeineFree: true,
    origin: '대한민국 충북 제천 청풍호반',
    capacity: '15g (유리병 보관용 / 약 25회분)',
    brewing: {
      waterTemp: '85℃ ~ 90℃',
      steepTime: '2분 30초',
      servings: '꽃잎 1티스푼',
      tip: '높은 온도보다 약간 식힌 온수(85℃)에 우려내면 특유의 꿀향과 달콤함이 더욱 극대화됩니다.'
    },
    description: '5월의 숲속을 걸을 때 마주치는 싱그러운 아카시아 향. 향수를 뿌린 듯 입안 가득 그윽한 천연 꽃꿀의 달콤함이 피어납니다.',
    story: '제천의 맑은 숲에서 만개하기 직전의 가장 순수한 꽃송이만을 골라 담았습니다. 차를 우리면 방 안 전체에 향긋한 봄바람이 부는 듯한 행복한 기분을 만끽하실 수 있습니다.',
    ingredients: '국내산 아카시아 꽃 100%',
    packagingOptions: ['단품 유리병', '선물용 린넨 파우치 (+2,000원)', '전통 비단 보자기 포장 (+5,000원)'],
    reviews: [
      {
        id: 'rev-6',
        author: '한*림',
        rating: 5,
        date: '2026.09.18',
        content: '차를 우리는 순간 방 전체에 아카시아 향이 싹 퍼져요. 꿀을 타지 않았는데도 끝맛이 달큰해서 단 거 생각날 때 디저트 대신 마시고 있습니다.',
        flowerTeaName: '달콤한 추억 아카시아 꽃차',
        helpfulCount: 22
      }
    ]
  },
  {
    id: 'blend-bloom-trio',
    name: '사계 화원 블렌딩 티백 세트 (15입)',
    koreanSubtitle: '간편하게 즐기는 3가지 시그니처 꽃차 블렌드',
    englishName: 'Four Seasons Floral Blend Teabag Set',
    category: 'blend',
    price: 28000,
    originalPrice: 32000,
    rating: 4.97,
    reviewCount: 680,
    badge: '간편 티백 베스트',
    flowerType: '복합 블렌딩 (목련+국화+장미)',
    image: 'https://images.unsplash.com/photo-1558160074-4d7d8bdf4256?q=80&w=900&auto=format&fit=crop',
    detailImages: [
      'https://images.unsplash.com/photo-1558160074-4d7d8bdf4256?q=80&w=900&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1563911302283-d2bc129e7570?q=80&w=900&auto=format&fit=crop'
    ],
    liquorColor: {
      hex: '#FB923C',
      name: '다채로운 붉은 황금빛',
      description: '꽃들의 황금 비율 조합으로 우려내는 블렌드마다 개성 있는 고운 수색을 냅니다.'
    },
    scentProfile: {
      sweetness: 4,
      aroma: 5,
      body: 4,
      clarity: 4,
      notes: ['풍부한 부케향', '은은한 감초 단맛', '민트의 청량함']
    },
    effects: ['하루 활력 충전', '간편한 일상 쉼', '소화 및 순환'],
    caffeineFree: true,
    origin: '대한민국 국내산 엄선 원료 (생분해성 PLA 삼각 티백)',
    capacity: '15개입 (3종 각 5입 / 옥수수전분 친환경 티백)',
    brewing: {
      waterTemp: '95℃',
      steepTime: '3분',
      servings: '티백 1개로 500ml 텀블러 우림 가능',
      tip: '미세플라스틱 걱정 없는 100% 옥수수 전분 친환경 삼각망으로 안심하고 드실 수 있습니다.'
    },
    description: '직장이나 외출 시에도 머그잔이나 텀블러에 쏙 넣어 마실 수 있는 프리미엄 생분해 삼각 티백 세트입니다. 모닝 블렌드, 애프터눈 블렌드, 나이트 블렌드 3종으로 구성되어 있습니다.',
    story: '다구가 없어도 누구나 일상에서 꽃차의 우아한 쉼을 누릴 수 있도록 기획했습니다. 잎과 꽃의 풍미가 가장 잘 우러나도록 넉넉한 공간의 피라미드 삼각망에 통꽃과 조화로운 허브를 블렌딩했습니다.',
    ingredients: '목련, 메리골드, 구절초, 당귀, 박하 (모두 국내산)',
    packagingOptions: ['에코 크라프트 슬리브 박스', '선물용 린넨 파우치 포장 (+2,000원)'],
    reviews: [
      {
        id: 'rev-7',
        author: '서*영',
        rating: 5,
        date: '2026.10.11',
        content: '회사 사무실에서 간편하게 마시기 너무 좋아요! 티백 하나로 머그컵 3번까지 진하게 우러나서 가성비도 최고입니다. 패키지도 감성 넘치네요.',
        flowerTeaName: '사계 화원 블렌딩 티백 세트',
        helpfulCount: 47
      }
    ]
  },
  {
    id: 'gift-hwadam-master',
    name: '화담(花談) 궁중 4계 프리미엄 꽃차 기프트 세트',
    koreanSubtitle: '귀한 분께 올리는 최고급 오동나무 & 실크 보자기 에디션',
    englishName: 'Hwadam Master Royal 4-Seasons Gift Set',
    category: 'gift',
    price: 89000,
    originalPrice: 105000,
    rating: 4.99,
    reviewCount: 394,
    badge: '명품 선물 1위',
    flowerType: '목련, 메리골드, 구절초, 맨드라미 4종',
    image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?q=80&w=900&auto=format&fit=crop',
    detailImages: [
      'https://images.unsplash.com/photo-1544787219-7f47ccb76574?q=80&w=900&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1576092768241-dec231879fc3?q=80&w=900&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1597481499750-3e6b22637e12?q=80&w=900&auto=format&fit=crop'
    ],
    liquorColor: {
      hex: '#E11D48',
      name: '사계절의 다채로운 오색',
      description: '사계절을 상징하는 황금빛, 옥빛, 루비빛, 레몬빛 꽃차 4병이 담겨 있습니다.'
    },
    scentProfile: {
      sweetness: 4,
      aroma: 5,
      body: 4,
      clarity: 5,
      notes: ['사계절의 화사한 부케', '품격 있는 다도', '지속적인 깊은 여운']
    },
    effects: ['명절/상견례 최고급 선물', '호흡기/눈/숙면 토탈 케어', '품격 있는 다도'],
    caffeineFree: true,
    origin: '대한민국 명품 청정 다원 100% 수제 덖음',
    capacity: '유리병 4종 (각 12g~15g) + 원목 티스푼 + 맞춤 캘리그라피 감사장',
    brewing: {
      waterTemp: '90℃ ~ 100℃',
      steepTime: '2분 30초 ~ 3분',
      servings: '각 꽃차별 상세 안내 책자 동봉',
      tip: '동봉된 최고급 월넛 원목 티스푼으로 꽃송이를 정갈하게 찻잔에 옮겨 담으실 수 있습니다.'
    },
    description: '화담의 장인이 한 해 동안 덖어낸 꽃차 중 가장 완성도 높은 4종을 선별하여 천연 오동나무 상자에 담고 수제 양면 실크 보자기로 정성껏 매듭지었습니다.',
    story: '마음을 전하고 싶은 소중한 부모님, 은사님, 귀빈, 상견례 선물로 가장 사랑받는 명작 세트입니다. 보자기 매듭 위에는 한국 전통 나비 노리개와 함께 원하시는 문구를 적은 손글씨 캘리그라피 엽서가 동봉됩니다.',
    ingredients: '백목련, 메리골드, 맨드라미, 구절초 (국내산 100%)',
    packagingOptions: ['청자빛 실크 보자기 (기본 무료)', '연분홍 실크 보자기 (무료)', '비취 쑥색 실크 보자기 (무료)'],
    reviews: [
      {
        id: 'rev-8',
        author: '정*우',
        rating: 5,
        date: '2026.10.15',
        content: '상견례 때 양가 부모님 선물로 드렸는데, 상자 열자마자 어머님들이 탄성을 지르셨습니다. 보자기 매듭도 너무 고급스럽고 꽃송이 하나하나가 그림 같아요. 진심으로 감사드립니다!',
        flowerTeaName: '화담 궁중 4계 프리미엄 꽃차 기프트 세트',
        helpfulCount: 56,
        tags: ['상견례성공', '고급선물', '극찬리뷰']
      }
    ]
  },
  {
    id: 'gift-duet-box',
    name: '다정한 온기 꽃차 2종 듀엣 선물세트',
    koreanSubtitle: '마음을 담아 건네는 가장 따스한 안부',
    englishName: 'Warm Bloom Duet Gift Set',
    category: 'gift',
    price: 49000,
    originalPrice: 56000,
    rating: 4.94,
    reviewCount: 310,
    badge: '선물 베스트',
    flowerType: '목련 + 메리골드 (호흡기 & 눈 건강 콤비)',
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=900&auto=format&fit=crop',
    detailImages: [
      'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=900&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1576092768241-dec231879fc3?q=80&w=900&auto=format&fit=crop'
    ],
    liquorColor: {
      hex: '#FBBF24',
      name: '황금빛 & 옥빛 듀오',
      description: '호흡기에 좋은 백목련과 눈 건강에 좋은 메리골드의 조화로운 색감.'
    },
    scentProfile: {
      sweetness: 4,
      aroma: 5,
      body: 3,
      clarity: 5,
      notes: ['상쾌한 박하바닐라', '구수한 국화꿀향']
    },
    effects: ['생일 축하', '집들이 선물', '환절기 건강 안부'],
    caffeineFree: true,
    origin: '대한민국 지리산 & 안동 화원',
    capacity: '유리병 2종 (각 12g, 15g) + 하드 케이스 + 선물용 쇼핑백',
    brewing: {
      waterTemp: '90℃ ~ 95℃',
      steepTime: '3분',
      servings: '약 50회분 분량',
      tip: '선물용 고급 화담 쇼핑백과 감사 카드가 기본 무료로 증정됩니다.'
    },
    description: '화담에서 가장 재구매율이 높은 백목련과 메리골드를 단정한 하드 박스에 담아 부담 없이 귀한 정성을 전할 수 있는 실속형 선물세트입니다.',
    story: '계절이 바뀔 때 안부를 묻고 싶은 친구, 고생하는 직장 동료, 생일을 맞은 소중한 이에게 건네는 따뜻한 온기입니다.',
    ingredients: '국내산 백목련 꽃, 메리골드 꽃 100%',
    packagingOptions: ['단정한 베이지 하드박스', '전통 보자기 포장 추가 (+4,000원)'],
    reviews: [
      {
        id: 'rev-9',
        author: '강*지',
        rating: 5,
        date: '2026.10.05',
        content: '친구 생일선물로 보냈는데 포장도 너무 예쁘고 꽃차 향기도 은은해서 하루 종일 힐링된다고 연락 왔어요. 다음에는 저를 위해서 하나 더 사려고요!',
        flowerTeaName: '다정한 온기 꽃차 2종 듀엣 선물세트',
        helpfulCount: 24
      }
    ]
  },
  {
    id: 'teaware-glass-teapot',
    name: '화담 내열유리 꽃피움 티팟 & 거름망 (600ml)',
    koreanSubtitle: '꽃이 피어나는 모든 순간을 투명하게 담아내는 전용 다기',
    englishName: 'Hwadam Bloom Borosilicate Glass Teapot',
    category: 'teaware',
    price: 32000,
    originalPrice: 38000,
    rating: 4.96,
    reviewCount: 420,
    badge: '다도 필수템',
    flowerType: '붕규산 내열유리 다구',
    image: 'https://images.unsplash.com/photo-1594631252845-29fc4cc8cde9?q=80&w=900&auto=format&fit=crop',
    detailImages: [
      'https://images.unsplash.com/photo-1594631252845-29fc4cc8cde9?q=80&w=900&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1576092768241-dec231879fc3?q=80&w=900&auto=format&fit=crop'
    ],
    liquorColor: {
      hex: '#E0E7FF',
      name: '투명하고 청명한 유리 광채',
      description: '고순도 붕규산 유리로 찻물의 영롱한 수색과 꽃잎의 맥동을 생생하게 관찰할 수 있습니다.'
    },
    scentProfile: {
      sweetness: 0,
      aroma: 0,
      body: 0,
      clarity: 5,
      notes: ['잡미 없는 순수한 차 맛 보존']
    },
    effects: ['내열 -20℃~150℃ 안전', '분리형 유리 거름망', '직화/전자레인지 가능'],
    caffeineFree: true,
    origin: '화담 전용 디자인 프리미엄 유리공방',
    capacity: '600ml (2~3인용 다도에 최적화)',
    brewing: {
      waterTemp: '100℃ 끓는 물 직수 가능',
      steepTime: '자유',
      servings: '2~3인',
      tip: '꽃잎이 피어나는 모습을 보려면 거름망 없이 꽃송이를 본체에 직접 띄워 우려보세요.'
    },
    description: '꽃차는 눈으로 먼저 마시는 예술입니다. 급격한 온도 변화에도 안전한 붕규산 내열유리로 제작되어, 꽃송이가 만개하고 찻물이 오색으로 물드는 감동을 완벽하게 선사합니다.',
    story: '물줄기가 부드럽게 흐르도록 설계된 유려한 노즐과 손에 편안히 감기는 원형 핸들이 다도의 편안함을 더해줍니다. 탈부착 가능한 유리 거름망이 포함되어 있어 잎차와 꽃차 모두 자유롭게 즐길 수 있습니다.',
    ingredients: '고내열 붕규산 유리 (BPA Free)',
    packagingOptions: ['에어 완충재 안전 박스 포장'],
    reviews: [
      {
        id: 'rev-10',
        author: '오*택',
        rating: 5,
        date: '2026.09.22',
        content: '꽃차 전용으로 샀는데 물 따를 때 흐르지도 않고, 투명해서 꽃잎 피는 거 보고 있으면 멍때리면서 힐링됩니다. 내열유리라 끓는 물 바로 부어도 튼튼해요.',
        flowerTeaName: '화담 내열유리 꽃피움 티팟',
        helpfulCount: 39
      }
    ]
  },
  {
    id: 'teaware-double-cups',
    name: '이중유리 꽃잎 찻잔 2P 세트 (120ml)',
    koreanSubtitle: '손끝은 시원하게, 찻잔 속 온기는 오래도록',
    englishName: 'Double-Wall Glass Tea Cup Pair',
    category: 'teaware',
    price: 18000,
    originalPrice: 22000,
    rating: 4.92,
    reviewCount: 260,
    badge: '인기 소품',
    flowerType: '이중 내열유리 찻잔',
    image: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?q=80&w=900&auto=format&fit=crop',
    detailImages: [
      'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?q=80&w=900&auto=format&fit=crop'
    ],
    liquorColor: {
      hex: '#F3E8FF',
      name: '공중에 떠 있는 찻물의 환상',
      description: '이중 진공벽 구조로 찻물이 허공에 둥실 떠 있는 듯한 신비로운 시각 효과를 냅니다.'
    },
    scentProfile: {
      sweetness: 0,
      aroma: 0,
      body: 0,
      clarity: 5,
      notes: ['뜨겁지 않은 편안한 그립감']
    },
    effects: ['표면 결로 및 화상 방지', '우수한 보온/보냉 효과'],
    caffeineFree: true,
    origin: '화담 디자인 티웨어',
    capacity: '120ml x 2잔 세트',
    brewing: {
      waterTemp: '모든 온도 호환',
      steepTime: '해당 없음',
      servings: '2잔 세트',
      tip: '뜨거운 차를 부어도 겉면이 뜨겁지 않아 손잡이 없이도 편안하게 두 손으로 감싸 쥘 수 있습니다.'
    },
    description: '꽃차의 고운 빛깔이 공중에 떠 있는 듯한 이중 구조 찻잔입니다. 차가운 차를 담아도 물방울이 맺히지 않고, 뜨거운 차를 담아도 손끝이 데이지 않습니다.',
    story: '두 사람이 마주 앉아 다정한 온기를 나누는 시간. 잔을 부딪칠 때 나는 맑은 풍경 소리와 함께 오색 꽃차의 빛깔을 오롯이 음미해보세요.',
    ingredients: '이중 붕규산 내열유리',
    packagingOptions: ['선물용 완충 하드케이스'],
    reviews: [
      {
        id: 'rev-11',
        author: '문*희',
        rating: 5,
        date: '2026.10.01',
        content: '수색이 예쁜 꽃차 담아 마시기에 이것만큼 완벽한 잔이 없네요. 찻물이 공중에 떠 있는 것 같아서 너무 예쁘고 손도 안 뜨거워요!',
        flowerTeaName: '이중유리 꽃잎 찻잔 2P 세트',
        helpfulCount: 18
      }
    ]
  }
];

export interface CartItem {
  product: TeaProduct;
  quantity: number;
  selectedPackaging: string;
}

export interface BojagiOption {
  id: string;
  name: string;
  colorName: string;
  hex: string;
  description: string;
  image: string;
}

export const BOJAGI_OPTIONS: BojagiOption[] = [
  {
    id: 'bojagi-pink',
    name: '연분홍 벚꽃 실크 보자기',
    colorName: '연분홍 (Rose Silk)',
    hex: '#F472B6',
    description: '화사하고 로맨틱한 축하, 결혼, 생일 선물에 가장 사랑받는 은은한 분홍빛 매듭',
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'bojagi-jade',
    name: '청아한 옥빛 비취 보자기',
    colorName: '청옥 (Celadon Jade)',
    hex: '#0D9488',
    description: '선비의 맑은 지조와 고결함을 상징하여 부모님, 은사님 예우 선물에 격조를 더합니다',
    image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'bojagi-navy',
    name: '달빛 감청색 비단 보자기',
    colorName: '감청 (Midnight Navy)',
    hex: '#1E293B',
    description: '차분하고 중후한 깊이감으로 기업 답례 및 명절 귀빈 선물에 최상의 품격을 부여합니다',
    image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'bojagi-sage',
    name: '싱그러운 쑥빛 비단 보자기',
    colorName: '비취쑥 (Sage Green)',
    hex: '#65A30D',
    description: '청정한 숲과 자연의 생명력을 전하며 집들이, 환절기 건강 기원에 적합합니다',
    image: 'https://images.unsplash.com/photo-1594631252845-29fc4cc8cde9?q=80&w=600&auto=format&fit=crop'
  }
];

export const TEA_STORY_STEPS = [
  {
    step: '01',
    title: '새벽 청정 채취',
    subtitle: '100% 무농약 국내산 청정 다원',
    desc: '꽃이 가장 향기로운 시간인 새벽 5시부터 7시 사이, 이슬을 머금은 만개 직전의 싱싱한 꽃송이만을 엄선하여 조심스럽게 손으로 땁니다.'
  },
  {
    step: '02',
    title: '꽃잎 손질 & 저온 건조',
    subtitle: '티끌 하나 없는 정갈한 손질',
    desc: '꽃송이 내부의 꽃가루 알레르기 유발 물질이나 불순물을 세심히 정돈하고, 꽃잎 본연의 생생한 색과 향미를 보존하도록 1차 저온 건조를 거칩니다.'
  },
  {
    step: '03',
    title: '전통 9증9포(九蒸九曝) 덖음',
    subtitle: '꽃의 찬 성질을 온화하게 다스림',
    desc: '가마솥에서 은은한 불로 아홉 번 찌고 아홉 번 말려(덖음과 식힘 반복), 꽃의 독성과 떫은맛을 날리고 달큰하고 고소한 풍미를 응축합니다.'
  },
  {
    step: '04',
    title: '향 가둠 & 정성 유리병 밀봉',
    subtitle: '자연의 숨결을 그대로 보존',
    desc: '마지막 잠재우기 과정을 통해 꽃차 본연의 그윽한 향을 가두고, 수분율 3% 미만의 완벽한 상태로 자외선 차단 씰링 처리합니다.'
  }
];

export const BREWING_GUIDE_STEPS = [
  {
    step: 1,
    time: '0초',
    title: '다기 예열 & 꽃 담기',
    desc: '투명한 유리 다관에 따뜻한 물을 부어 잔을 덥힌 후 비우고, 꽃 1~2송이를 정성껏 올려놓습니다.',
    icon: 'Sparkles'
  },
  {
    step: 2,
    time: '10초',
    title: '95℃ 맑은 온수 붓기',
    desc: '한 김 식힌 90~95℃의 온수를 꽃잎 위로 천천히 회오리치듯 부어줍니다. 이때 꽃잎이 춤을 추듯 일어납니다.',
    icon: 'Flame'
  },
  {
    step: 3,
    time: '3분',
    title: '꽃이 피어나는 쉼 (만개)',
    desc: '3분 동안 서서히 활짝 펼쳐지는 꽃잎과 물들어가는 찬란한 수색(水色)을 감상하며 깊은 숨을 내쉽니다.',
    icon: 'Clock'
  },
  {
    step: 4,
    time: '음용',
    title: '향과 맛의 3단 음미',
    desc: '코끝으로 피어오르는 첫 향을 맡고, 혀끝으로 전해지는 고운 맛을 즐깁니다. 3~4번까지 재우림이 가능합니다.',
    icon: 'Heart'
  }
];
