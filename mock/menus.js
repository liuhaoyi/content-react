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
            "name": "news", 
            "locale": "menu.forums",
            "icon": 'news',
            "children":[
                {
                    path: '/news/smallcatalog',
                    name: 'smallcatalog',
                    component: './News/SmallCatalog',
                    // "locale": "menu.forums.subject"
                },
                {
                    path: '/news/article/1',
                    name: 'news',
                    component: './News/News',
                    // "locale": "menu.forums.subject"
                },
                {
                    path: '/news/article/2',
                    name: 'news2',
                    component: './News/News',
                    // "locale": "menu.forums.subject"
                }
                // {
                //     "path": "/forums/communication?type=1",
                //     "name": "communication",
                //    // "exact": true, 
                //     "locale": "menu.forums.communication"
                // }, 
                // {
                //     "path": "/forums/subject",
                //     "name": "subject",
                //   //  "exact": true, 
                //     "locale": "menu.forums.subject"
                // }, 
            ]
        }, 
        {
            "path": "/forums", 
            "name": "forum", 
            "locale": "menu.forums",
            "icon": 'usergroup-add',
            "children":[
                {
                    "path": "/forums/communication?type=1",
                    "name": "communication",
                   // "exact": true, 
                    "locale": "menu.forums.communication"
                }, 
                {
                    "path": "/forums/subject",
                    "name": "subject",
                  //  "exact": true, 
                    "locale": "menu.forums.subject"
                }, 
            ]
        }, 
        {
            "path": "/feedback", 
            "name": "feedback", 
           // "exact": true,
            "locale": "menu.feedback",
            "icon": 'issues-close',
            "children":[
                {
                    "path": "/feedback/issues",
                    "name": "issues",
               //     "exact": true, 
                    "locale": "menu.feedback.issues"
                }, 
                {
                    "path": "/feedback/requirementmanager",
                    "name": "requirementmanager",
                 //   "exact": true, 
                    "locale": "menu.feedback.requirementmanager"
                },                
            ]
        }, 

        {
            "path": "/knowledgebase", 
            "name": "knowledgebase", 
         //   "exact": true,
            "locale": "menu.knowledgebase",
            "icon": 'file-search',
            "children":[     
                {
                    "path": "/assistant", 
                    "name": "assistant", 
           //         "exact": true, 
                    "locale": "menu.assistant"
                }, 
                {
                    "path": "/knowledge", 
                    "name": "knowledge", 
           //         "exact": true, 
                    "locale": "menu.knowledge"
                },   
             ]
        }, 
        {
            "path": "/report", 
            "name": "report", 
            "locale": "menu.report",
            "icon": 'pie-chart',
            "children":[
                {
                    "path": "/feedback/feedbackReport",
                    "name": "feedbackReport",
              //      "exact": true, 
                    "locale": "menu.report.feedbackReport"
                }, 
                {
                    "path": "/report/deptranking",
                    "name": "deptranking",
               //     "exact": true, 
                    "locale": "menu.report.deptranking"
                }, 
                {
                    "path": "/report/userranking",
                    "name": "userranking",
                 //   "exact": true, 
                    "locale": "menu.report.userranking"
                }
            ]
        }, 
    ]
   )

   export default {
    'GET /api/menus': getMenus,
  };