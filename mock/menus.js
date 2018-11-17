const getMenus = (req,res) =>
   res.json(
    [

        // {
        //     path: '/',
        //     component: '../layouts/BasicLayout',
        //     Routes: ['src/pages/Authorized'],
        //     authority: ['admin', 'user'],
        //     routes: [
        //       // dashboard
        //       { path: '/', redirect: '/dashboard/analysis' },
        //       {
        //         path: '/news',
        //         name: 'news',
        //         icon: 'news',
        //         routes: [
        //           {
        //             path: '/news/smallcatalog',
        //             name: 'smallcatalog',
        //             component: './News/SmallCatalog',
        //           },
        //           {
        //             path: '/news/article/:catalog',
        //             hideInMenu:true,
        //             name: 'news',
        //             component: './News/News',
        //           }
        //           // {
        //           //   path: '/dashboard/workplace',
        //           //   name: 'workplace',
        //           //   component: './Dashboard/Workplace',
        //           // },
        //         ],
        //       },
        {
            "path": "/news", 
            "name": "炼化新闻", 
            "locale": "menu.forums",
            "icon": 'usergroup-add',
            "children":[
                // {
                //     path: '/news/smallcatalog',
                //     // name: 'smallcatalog',
                //     name: '小类',
                //     component: './News/SmallCatalog',
                //     // "locale": "menu.forums.subject"
                // },
                {
                    path: '/news/article/1',
                    name: '公司要闻',
                    // name: 'news',
                    component: './News/News',
                    // "locale": "menu.forums.subject"
                },
                {
                    path: '/news/article/2',
                    name: '外媒看炼化',
                    component: './News/News',
                    // "locale": "menu.forums.subject"
                }
            ]
        }, 
        {
            "path": "/news", 
            "name": "企业文化", 
            "locale": "menu.forums",
            "icon": 'usergroup-add',
            "children":[
                // {
                //     path: '/news/smallcatalog',
                //     // name: 'smallcatalog',
                //     name: '小类',
                //     component: './News/SmallCatalog',
                //     // "locale": "menu.forums.subject"
                // },
                {
                    path: '/news/article/5',
                    name: '文化理念',
                    // name: 'news',
                    component: './News/News',
                    // "locale": "menu.forums.subject"
                },
                {
                    path: '/news/article/6',
                    name: '文化推进',
                    component: './News/News',
                    // "locale": "menu.forums.subject"
                }
            ]
        }, 
        {
            "path": "/news", 
            "name": "学习园地", 
            "locale": "menu.forums",
            "icon": 'usergroup-add',
            "children":[
                {
                    path: '/news/article/10',
                    name: '应知应会',
                    // name: 'news',
                    component: './News/News',
                    // "locale": "menu.forums.subject"
                },
                {
                    path: '/news/article/11',
                    name: '微课',
                    component: './News/News',
                    // "locale": "menu.forums.subject"
                },
                {
                    path: '/news/article/9',
                    name: '学习资料',
                    component: './News/News',
                    // "locale": "menu.forums.subject"
                }
            ]
        }, 
        {
            "path": "/news", 
            "name": "炼化榜样", 
            "locale": "menu.forums",
            "icon": 'usergroup-add',
            "children":[
                // {
                //     path: '/news/smallcatalog',
                //     // name: 'smallcatalog',
                //     name: '小类',
                //     component: './News/SmallCatalog',
                //     // "locale": "menu.forums.subject"
                // },
                {
                    path: '/news/article/7',
                    name: '劳动模范',
                    // name: 'news',
                    component: './News/News',
                    // "locale": "menu.forums.subject"
                },
                {
                    path: '/news/article/8',
                    name: '好工匠',
                    component: './News/News',
                    // "locale": "menu.forums.subject"
                }
            ]
        }, 
        {
            "path": "/news", 
            "name": "其它", 
            "locale": "menu.forums",
            "icon": 'usergroup-add',
            "children":[
                // {
                //     path: '/news/smallcatalog',
                //     // name: 'smallcatalog',
                //     name: '小类',
                //     component: './News/SmallCatalog',
                //     // "locale": "menu.forums.subject"
                // },
                {
                    path: '/news/article/shouyedongtu',
                    name: '首页动图',
                    // name: 'news',
                    component: './News/News',
                    // "locale": "menu.forums.subject"
                },
                {
                    path: '/news/article/gongsidongtai',
                    name: '公司动态',
                    // name: 'news',
                    component: './News/News',
                    // "locale": "menu.forums.subject"
                },
                {
                    path: '/news/article/tongzhigonggao',
                    name: '通知公告',
                    component: './News/News',
                    // "locale": "menu.forums.subject"
                },
                {
                    path: '/news/article/zhongdiangongzuo',
                    name: '重点工作',
                    component: './News/News',
                    // "locale": "menu.forums.subject"
                },
                {
                    path: '/news/article/yuangongshouce',
                    name: '员工手册',
                    component: './News/News',
                    // "locale": "menu.forums.subject"
                }
            ]
        }, 
    ]
   )

   export default {
    'GET /api/menus': getMenus,
  };