const Mock = require("mockjs");

const data = Mock.mock({
  "items|30": [
    {
      id: "@id",
      title: "@cword(10, 20)",
      "status|1": ["published", "draft", "deleted"],
      author: "name",
      display_time: "@datetime",
      page_views: "@integer(300, 5000)"
    }
  ]
});

module.exports = [
  {
    url: "/api/user/list",
    type: "post",
    response: (config) => {
      const items = data.items;
      return {
        code: 0,
        msg: "success",
        data: {
          total: items.length,
          items: items
        }
      };
    }
  },
  {
    url: "/api/user/login",
    type: "post",
    response: (config) => {
      return {
        code: 0,
        msg: "success",
        data: {
          name: "admin",
          nickName: "nickName",
          pass: 123456,
          age: 32,
          relation: {
            name: "suSan",
            age: 23
          },
          level: ["admin", "system", "all"]
        }
      };
    }
  }
];
