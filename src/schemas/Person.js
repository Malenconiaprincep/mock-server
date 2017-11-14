const Person = `

  # 记录一个朋友的联系信息
  type Person {
    # person的内部，必需
    id: ID!

    # 名，必需
    firstName: String!

    # 姓，必需
    lastName: String!

    # 年龄
    age: Int

    # person的电话号码
    phone: String

    # 电话号码是否手机号
    isMobile: Boolean

    # person的好友
    bestFriend: Person
  } 

  input PersonInput {
    # person的内部ID
    id: ID

    # 名，必需
    firstName: String!

    # 姓，必需
    lastName: String!

    # 年龄
    age: Int

    # person的电话号码
    phone: String

    # 电话号码是否手机号
    isMobile: Boolean

    # person的好友的ID
    bestFriend: ID
  }

  # the schema allows the following query:
  type Query {
    # 通过id获取单独的Person
    person (id: ID): Person

    # 获取所有的Person
    people: [Person!]!
  }

  type Mutation {
    # 创建或更新一个Person
    person (input: PersonInput): Person
  }

`

export default Person
