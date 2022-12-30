DROP TABLE IF EXISTS orderItems;
DROP TABLE IF EXISTS orders;
DROP TABLE IF EXISTS cartItems;
DROP TABLE IF EXISTS books;
DROP TABLE IF EXISTS users;

CREATE TABLE books (
		bookID      int(11) auto_increment not null,
		ISBN		 		char(13) default null,
		title    		varchar(50) not null,
		type        varchar(20) default null,
		author   		varchar(50) default null,
		price   	 	bigint not null,
		description varchar(500) default null,
		stock   		int(11) not null,
		press    		varchar(50) default null,
		image      	varchar(255) default null,
		primary key (bookID)
);

CREATE TABLE users (
		userID      int(11) auto_increment not null,
		userName    varchar(30) not null,
		`password`  varchar(30) not null,
		userType    int(11) not null,
		nickname    varchar(30) default null,
		email       varchar(50) default null,
		phone       varchar(15) default null,
		address     varchar(100) default null,
		primary key (userID)
);

CREATE TABLE orders (
		orderID   bigint auto_increment not null,
		userID    int(11) not null,
		state     varchar(5) not null,
		time      char(19) not null,
		payment   bigint not null,
		consignee varchar(15) default null,
		phone     varchar(15) default null,
		address   varchar(60) default null,
		primary key (orderID),
		foreign key (userID) references users(userID)
);

CREATE TABLE orderItems (
		orderID   bigint not null,
		bookID    int(11) not null,
		quantity  int(11) not null,
		unitPrice bigint not null,
		primary key (orderID, bookID),
		foreign key (orderID) references orders(orderID),
		foreign key (bookID) references books(bookID)
);

CREATE TABLE cartItems (
		userID   	int(11) not null,
		bookID    int(11) not null,
		time      char(19) not null,

		primary key (userID, bookID),
		foreign key (userID) references users(userID),
		foreign key (bookID) references books(bookID)
);

INSERT INTO `books` VALUES (null, '9787111573319', 'Java核心技术卷II', '编程', '凯S.霍斯特曼', '9520', '本书是Java领域有影响力和价值的著作之一，由拥有20多年教学与研究经验的Java技术专家撰写（获Jolt大奖），与《Java编程思想》齐名，10余年全球畅销不衰，广受好评。第10版根据JavaSE8全面更新，同时修正了第9版中的不足，系统全面讲解了Java语言的核心概念、语法、重要特性和开发方法，包含大量案例，实践性强。', '1000', '机械工业出版社','http://img3m9.ddimg.cn/12/36/1546133799-1_w_1.jpg');
INSERT INTO `books` VALUES (null, '9787111544937', '深入理解计算机系统', '编程', '兰德尔·E·布莱恩特', '13690', '程序员必读经典著作！理解计算机系统*书目，10万程序员共同选择。第二版销售突破100000册，第三版重磅上市！', '1200', '机械工业出版社', 'http://img3m7.ddimg.cn/48/0/24106647-1_w_6.jpg');
INSERT INTO `books` VALUES (null, '9787536693968', '软件工程原理', '编程', '沈备军、陈昊鹏、陈雨亭', '3590', '从软件工程的本质出发、结合实际案例，系统全面地介绍软件过程、软件建模技术与方法及软件工程管理同时介绍一些热点新技术和新方法。', '1024', '高等教育出版社', 'http://img3m6.ddimg.cn/32/30/1204489076-1_w_1.jpg');
INSERT INTO `books` VALUES (null, '9787536693968', '红楼梦', '世界名著', '曹雪芹', '1880', '中国古典小说佳作，影响整个华人世界的经典！轻松易学、国家教育部推荐读物！', '2441', '人民文学出版社','http://img3m6.ddimg.cn/31/22/23828836-1_w_8.jpg');
INSERT INTO `books` VALUES (null, '9787534618727', '草房子', '儿童文学', '曹文轩', '2250', '人民文学出版社天天出版社出品，经典作品，教师推荐，已有超过150000读者给予好评！', '1235', '江苏人民出版社', 'http://img3m2.ddimg.cn/32/4/23662022-1_w_9.jpg');
INSERT INTO `books` VALUES (null, '9787208061644', '追风筝的人', '世界名著', '卡勒德·胡赛尼', '3530', '“许多年过去了，人们说陈年旧事可以被埋葬，然而我终于明白这是错的，因为往事会自行爬上来。回首前尘，我意识到在过去二十六年里，自己始终在窥视着那荒芜的小径。”', '14141', '上海人民出版社','http://img3m5.ddimg.cn/26/14/25238195-1_w_3.jpg');
INSERT INTO `books` VALUES (null, '9787111092865', 'Java编程思想', '编程', 'Bruce Eckel', '9120', 'Java学习必读经典,殿堂级著作！赢得了全球程序员的广泛赞誉。', '9096', '机械工业出版社','http://img3m0.ddimg.cn/4/24/9317290-1_w_5.jpg');
INSERT INTO `books` VALUES (null, '9788545862154', '魔兽世界编年史套装(全三卷)', '魔幻小说', '克里斯˙梅森', '44920','暴雪官方历时二十年编纂而成的史料！三卷《魔兽世界编年史》将呈现大量从未公布的精美原画和插图，读者在阅读故事之余，更能享受一次视觉上的饕餮盛宴，是魔兽粉丝收藏的优选。', '123', '新星出版社','http://img3m7.ddimg.cn/43/9/25352557-1_w_3.jpg');
INSERT INTO `books` VALUES (null, '9787229124410', '三体：全三册', '科幻小说', '刘慈欣', '5020', '刘慈欣代表作，亚洲首部“雨果奖”获奖作品！', '14414', '重庆出版社','http://img3m4.ddimg.cn/32/35/23579654-1_u_3.jpg');
INSERT INTO `books` VALUES (null, '9787508043319', '悲惨世界（上中下）（精装版）', '世界名著', '雨果', '10400', '《悲惨世界》是雨果在流亡期间写的长篇小说，是他的代表作，也是世界文学宝库的珍品之一。\r\n    《悲惨世界》通过冉阿让等人的悲惨遭遇以及冉阿让被卞福汝主教感化后一系列令人感动的事迹，深刻揭露和批判了19世纪法国封建专制社会的腐朽本质及其罪恶现象，对穷苦人民在封建重压下所遭受的剥削欺诈和残酷迫害表示了悲悯和同情。', '388', '人民文学出版社', 'http://img3m7.ddimg.cn/13/15/27912667-1_u_1.jpg');
INSERT INTO `books` VALUES (null, '9787505739093', '动物农场', '社会小说', '乔治·奥威尔', '2040', '也译“动物庄园”，是“一代人的冷峻良知”乔治·奥威尔经典的讽喻之作。虽然这一场荒诞的动物革命走向歧途，但正是因为这样我们才了解“把权力关进制度的笼子”的重要性。', '123', '译林出版社', 'http://img3m1.ddimg.cn/82/3/25229341-1_w_2.jpg');
INSERT INTO `books` VALUES (null, '9787302423287', '机器学习', '编程', '周志华', '6160', '击败AlphaGo的武林秘籍，赢得人机大战的必由之路：人工智能大牛周志华教授巨著，全面揭开机器学习的奥秘。', '2525','清华大学出版社', 'http://img3m0.ddimg.cn/20/24/23898620-1_w_3.jpg');
INSERT INTO `books` VALUES (null, '9787511367877', '纳尼亚传奇', '魔幻小说', '刘易斯', '8620', '刘易斯基金会独家授权插图！翻译家吴岩，陈良廷，刘文澜经典译本！', '123', '中国华侨出版社','http://img3m7.ddimg.cn/1/32/22474387-1_u_2.jpg');
INSERT INTO `books` VALUES (null, '9787544700160', '老人与海', '世界名著', '海明威', '2780', '收录诺贝尔文学奖获奖作品《老人与海》《乞力马扎罗的雪》，深深影响了马尔克斯、塞林格等文学家的创作理念。', '2414', '现代教育出版社', 'http://img3m6.ddimg.cn/94/11/27891166-1_u_2.jpg');
INSERT INTO `books` VALUES (null, '9787559632654', '魔力的胎动', '悬疑/推理小说', '东野圭吾', '3590', '喜欢《解忧杂货店》，就一定要读这本书。珍藏印签。有了想要守护的东西，生命就会变得有力量。悲凉的人生、千疮百孔的命运、一桩桩悲剧的发生与救赎，读来令人喟叹不已。', '1232', '北京联合出版社','http://img3m4.ddimg.cn/68/35/28484744-2_u_6.jpg');
INSERT INTO `books` VALUES (null, '9787533959111', '我不怕这漫长黑夜', '青春文学', '苑子豪', '3750', '七篇寻光故事，七种奇遇人生，送给成长路上孤独前行的你，每个人的生活都有被困在井里一样的绝望时刻，而这本书就想做点亮黑夜的那束光芒。耐心一些，保持相信，我们终会穿越漫长黑夜，抵达属于自己的黎明。', '1142', '浙江文艺出版社','http://img3m0.ddimg.cn/9/18/28486170-1_u_8.jpg');
INSERT INTO `books` VALUES (null, '9787513927277', '永久记录', '传记文学', '爱德华·斯诺登', '5670', '美国政府不想让全世界读到这本书，欧美上市当日作者便被美国司法部起诉！“棱镜门”主角爱德华·斯诺登首次亲自披露美国政府滥用NSA系统监控世界的真相，袒露从“爱国者”到“叛国者”的心路历程。', '124', '民主与建设出版社',  'http://img3m5.ddimg.cn/86/22/28475555-2_u_9.jpg');
INSERT INTO `books` VALUES (null, '9787501614981', '探索月球', '儿童文学', '安妮·詹克利奥维奇', '13320', '嫦娥五号探测器系统副总设计师彭兢诚意推荐！纪念人类登月50周年，五大精妙立体机关直观呈现月球的运行轨迹，全方位揭秘人类探月登月的过程，普及基本的航天知识，与孩子一起解读月球的奥秘，种下探索宇宙的种子。', '1516', '天天出版社','http://img3m4.ddimg.cn/13/30/28481224-1_w_3.jpg');
INSERT INTO `books` VALUES (null, '9787504186294', '高考英语 五年高考三年模拟', '中小学教辅', '曲一线', '7080', '五年高考三年模拟，英语五三高考练习册，五三高中同步53全练全解，你值得拥有！', '12332', '教育科学出版社', 'http://img3m4.ddimg.cn/62/14/27883214-1_w_2.jpg');
INSERT INTO `books` VALUES (null, '9787560925257', 'Effective C++', '编程', '梅耶', '5130', '大师名著纵横二十载，稳居任一荐书单三甲；称职程序员傍身绝学，通向C++精微奥妙之门。', '1000', '电子工业出版社','http://img3m6.ddimg.cn/96/25/21000966-1_u_12.jpg');
INSERT INTO `books` VALUES (null, '9787559428677', '小王子', '儿童文学', '圣-埃克苏佩里', '889', '豆瓣9.7高分推荐！旅法翻译家梅子涵之女梅思繁法文直译，舒朗大开本，央美教授高精度还原原作插画。首次收录全球舞台剧、音乐会、电影、动画片等对《小王子》的精彩诠释，通晓名作的前世今生。', '1000', '儿童文学出版社','http://img3m9.ddimg.cn/75/6/25067469-1_u_2.jpg');
INSERT INTO `books` VALUES (null, '9787111375296', '数据库系统概念', '编程', '西尔伯沙茨', '7420', '本书内容丰富，不仅讨论了关系数据模型和关系语言、数据库设计过程、关系数据库理论、数据库应用设计和开发、数据存储结构、数据存取技术、查询优化方法、事务处理系统和并发控制、故障恢复技术、数据仓库和数据挖掘，而且对性能调整、性能评测标准、数据库应用测试和标准化等高级应用主题进行了广泛讨论。', '244', '机械工业出版社','http://img3m2.ddimg.cn/83/5/22632572-1_w_1.jpg');
INSERT INTO `books` VALUES (null, '9787111407010', '算法导论', '编程', '科尔曼', '7763', '全书选材经典、内容丰富、结构合理、逻辑清晰，对本科生的数据结构课程和研究生的算法课程都是非常实用的教材，在IT专业人员的职业生涯中，本书也是一本案头必备的参考书或工程实践手册。', '144', '机械工业出版社', 'http://img3m8.ddimg.cn/89/15/1517005898-1_w_1.jpg');
INSERT INTO `books` VALUES (null, '9787101142365', '史记（文白对照本）', '古籍', '司马迁', '23710', '荣获商务印书馆2019人文社科十大好书，张大可先生《史记》研究的集成之作，精细考证，廓清原书真伪；题解语译，展现著者史观，是一部人人都能读懂、人人都会爱读的文白对照本《史记》。', '4141', '中华书局', 'http://img3m7.ddimg.cn/14/14/27915737-1_w_3.jpg');
INSERT INTO `books` VALUES (null, '9787800300912', '天龙八部(全五册)', '武侠小说', '金庸', '10230', '《天龙八部》一书以北宋、辽、西夏、大理并立的历史为宏大背景，将儒释道、琴棋书画等中国传统文化融会贯通其中，书中人物繁多，个性鲜明，情节离奇，尽显芸芸众生百态。', '74747', '广州出版社','http://img3m2.ddimg.cn/84/17/23273202-1_w_1.jpg');
INSERT INTO `books` VALUES (null, '9787546200712', '笑傲江湖(全四册)', '武侠小说', '金庸', '8010', '一部《辟邪剑谱》引发灭门血案，阴险狡诈，机关算尽，只为争霸武林，真相往往出人意表。酒后高歌磨剑，梦中快意恩仇，一曲《笑傲江湖》，传一段天荒地老。 ', '2522', '广州出版社', 'http://img3m0.ddimg.cn/82/15/23273200-1_w_1.jpg');
INSERT INTO `books` VALUES (null, '9787806070703', '楚留香传奇(全三册)', '武侠小说', '古龙', '22450', '《楚留香传奇》无疑乃古龙诸作中*为烩炙人口之作，此作固成就古龙之盛名，更成为武侠文学之重要里程碑。楚留香有西方007罗杰摩尔之冷静、优雅、明快及幽默，更因他没有复仇及情爱之纠葛（例如他从来不杀人）而超越007，颇有“本来无一物，何处惹尘埃”的意境。', '551', '珠海出版社', 'http://img3m4.ddimg.cn/4/22/1592963464-1_w_1.jpg');
INSERT INTO `books` VALUES (null, '9787020103294', '哈利波特与魔法石', '魔幻小说', 'J·K·罗琳', '3020', '“沉湎于虚幻的梦想，而忘记现实的生活，这是毫无益处的，千万记住。”                                ——阿不思·邓布利多', '1000', '人民文学出版社', 'http://img3m1.ddimg.cn/88/0/25479421-1_w_1.jpg');
INSERT INTO `books` VALUES (null, '9787020103355', '哈利·波特与死亡圣器', '魔幻小说', 'J·K·罗琳', '5620', '两个人不能都活着，只有一个生存下来，我们中的一个将要永远离开……', '1551', '人民文学出版社', 'http://img3m4.ddimg.cn/71/20/25479404-1_w_1.jpg');

INSERT INTO `users` VALUES (null, 'bookLover', 'loveBook', '0', 'bookLover', 'bookLover@sjtu.edu.cn', null, null);
INSERT INTO `users` VALUES (null, 'readLover', 'loveRead', '0', 'readLover', 'readLover@sjtu.edu.cn', null, null);
INSERT INTO `users` VALUES (null, 'admin', 'admin', '1', 'admin', 'admin@sjtu.edu.cn', null, null);

INSERT INTO `orders` VALUES (null, '1', '已收货', '2022-04-30 00:00:00', '5000', '张三', '15746012253', '上海交通大学闵行校区');
INSERT INTO `orders` VALUES (null, '1', '待收货', '2022-05-01 00:00:00', '10000', '张三', '15746012253', '上海交通大学闵行校区');
INSERT INTO `orders` VALUES (null, '1', '待发货', '2022-05-23 09:56:30', '68840', '李四', '18309092222', '上海市闵行区东川路800号上海交通大学闵行校区');

INSERT INTO `orderItems` VALUES ('1', '1', '1', '9000');
INSERT INTO `orderItems` VALUES ('2', '2', '2', '13000');
INSERT INTO `orderItems` VALUES ('1', '17', '5', '3000');
INSERT INTO `orderItems` VALUES ('2', '3', '1', '5000');
INSERT INTO `orderItems` VALUES ('1', '12', '1', '2500');
INSERT INTO `orderItems` VALUES ('3', '1', '5', '9520');
INSERT INTO `orderItems` VALUES ('3', '19', '3', '7080');

INSERT INTO `cartItems` VALUES ('1', '18', '2022-04-30 00:00:00');
INSERT INTO `cartItems` VALUES ('1', '19', '2022-05-01 00:00:00');
INSERT INTO `cartItems` VALUES ('1', '21', '2022-05-10 00:00:00');
