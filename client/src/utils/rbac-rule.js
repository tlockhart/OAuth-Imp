const rules = {
    visitor: {
      static: [
          "products:view", 
          "products:hide",
          "home-page:visit"
        ]
    },
    writer: {
      static: [
        "posts:list",
        "posts:create",
        "users:getSelf",
        "home-page:visit",
        "dashboard-page:visit"
      ],
      dynamic: {
        "posts:edit": ({userId, postOwnerId}) => {
          if (!userId || !postOwnerId) return false;
          return userId === postOwnerId;
        }
      }
    },
    admin: {
      static: [
        "products:view",
        "products:update",
        "products:insert",
        "products:delete",
        "users:get",
        "users:getSelf",
        "home-page:visit",
        "dashboard-page:visit"
      ]
    }
  };

  export default rules;