import R from 'ramda'
const HIGH_PRIORITY = 'high'

const tasks = [
  {
    username: 'Michael',
    title: 'Curry stray functions',
    dueDate: '2014-05-06',
    complete: true,
    tag: 'work',
    priority: 'low',
  },
  {
    username: 'Michael',
    title: 'Write intro doc',
    dueDate: '2014-05-16',
    complete: true,
    tag: 'work',
    priority: 'low',
  },
  {
    username: 'Michael',
    title: 'Add modulo function',
    dueDate: '2014-05-17',
    complete: false,
    tag: 'work',
    priority: 'low',
  },
  {
    username: 'Michael',
    title: 'Make dinner',
    dueDate: '2014-05-24',
    complete: false,
    tag: 'life',
    priority: 'medium',
  },

  {
    username: 'Scott',
    title: 'Fix `and`/`or`/`not`',
    dueDate: '2014-06-05',
    complete: false,
    tag: 'work',
    priority: 'low',
  },
  {
    username: 'Michael',
    title: 'Make love',
    dueDate: '2014-06-06',
    complete: false,
    tag: 'life',
    priority: 'high',
  },
  {
    username: 'Scott',
    title: 'Born a monkey',
    dueDate: '2014-06-11',
    complete: true,
    tag: 'life',
    priority: 'high',
  },
  {
    username: 'Scott',
    title: 'Determine versioning scheme',
    dueDate: '2014-06-15',
    complete: true,
    tag: 'work',
    priority: 'medium',
  },
  {
    username: 'Scott',
    title: 'Go to the playground',
    dueDate: '2014-06-22',
    complete: false,
    tag: 'life',
    priority: 'high',
  },
  {
    username: 'Richard',
    title: 'Have a cup of coffee',
    dueDate: '2014-06-25',
    complete: true,
    tag: 'life',
    priority: 'high',
  },
]

// incomplete: [Task] -> [Task]
// sortByDate: [Task] -> [Task]
// sortByDateDescend: [Task] -> [Task]
// activeByTag: [Task] -> {String: [Task]}
// sortTagTasks: {String: [Task]} -> {String: [Task]}

const incomplete = R.filter(R.whereEq({complete: false}))

const sortByDate = R.sortBy(R.prop('dueDate'))

const sortByDateDescend = R.compose(R.reverse, sortByDate)

const importantFields = R.project(['title', 'priority'])

const groupByTag = R.groupBy(R.prop('tag'))

const activeByTag = R.compose(groupByTag, incomplete)

const gloss = R.compose(importantFields, R.take(2), sortByDateDescend)

const topData = R.compose(gloss, incomplete)

const topDataAllTags = R.compose(R.map(gloss), activeByTag)

// const byTag = R.useWith(R.filter).over(R.propEq('tag'))

// console.log('Gloss for work:')
// console.log(topData(byTag('work', tasks)))
// console.log('====================')
console.log('active for tag:')
console.log(activeByTag(tasks))
console.log('====================')
console.log('topData:')
console.log(topData(tasks))
console.log('====================')
console.log('Gloss for tag:')
console.log(topDataAllTags(tasks))

// const double = x => x * 2

// console.log(R.map(double, [1, 2, 3])) //=> [2, 4, 6]

// const extract = (filterFn, mapFn, tasks) => tasks.filter(filterFn).map(mapFn)

// const incomplete = item => item && !item.complete
// const titleForIncomplete = extract.bind(this, incomplete, item => item.title)
// const titleAndPriorityForIncomplete = extract.bind(
//   this,
//   incomplete,
//   R.pick(['title', 'priority'])
// )

// console.log(titleForIncomplete(tasks), titleAndPriorityForIncomplete(tasks))

// const square = R.curry(x => x * x)
// // const operate = R.pipe(R.multiply, R.inc, square)
// // const operate = (x, y) => square(R.inc(R.multiply(x, y)))
// const operate = R.compose(square, R.inc, R.multiply)
// console.log(operate(2, 4))

// // R.both
// const isHighPriority = task => task.priority === HIGH_PRIORITY
// const wasComplete = task => Boolean(task.complete)
// const isHighPriorityAndComplete = task =>
//   R.both(isHighPriority, wasComplete)(task)
// console.log(isHighPriorityAndComplete(tasks[8]))

// const isHighPriority = task => task.priority === HIGH_PRIORITY
// const wasComplete = task => Boolean(task.complete)

// const isHighPriorityAndComplete = task =>
//   R.both(isHighPriority, wasComplete)(task)

// const isHighPriority = task => R.equals(R.prop('priority', task), HIGH_PRIORITY)
const isHighPriority = task => R.equals(HIGH_PRIORITY, prop('priority')(task))

const wasComplete = task => Boolean(R.prop('complete')(task))

R.compose(Boolean, R.prop('complete'))

const isHighPriorityAndComplete = R.both(isHighPriority, wasComplete)

// R.either
const gt10 = x => x > 10
const even = x => x % 2 === 0
const f = R.either(gt10, even)
// function incomplete(tasks) {
//   var results = []
//   for (var i = 0; i < tasks.length; i++) {
//     console.log(tasks[i], !tasks[i].complete)
//     if (tasks[i] && !tasks[i].complete) {
//       results.push(tasks[i])
//     }
//   }
//   return results
// }

// const titleForIncomplete = tasks =>
//   tasks.filter(item => item && !item.complete).map(item => item.title)

// const incomplete = R.filter(R.whereEq({complete: false}))
// const sortByDate = R.sortBy(R.prop('dueDate'))
// const sortByDateDescend = R.compose(R.reverse, sortByDate)
// const importantFields = R.project(['title', 'dueDate'])
// const groupByTag = R.partition(R.prop('tag'))
// const activeByTag = R.compose(groupByTag, incomplete)
// const gloss = R.compose(R.take(5), sortByDateDescend)
// const topData = R.compose(gloss, incomplete)
// const topDataAllTags = R.compose(R.map(gloss), activeByTag)
// // const byTag = R.useWith(R.filter).over(R.propEq('tag'))

// console.log('groupByTag', groupByTag(tasks))
// console.log('activeByTag', activeByTag(tasks))
// console.log('importantFields', importantFields(tasks))
// console.log('gloss', gloss(tasks))
// console.log('topDataAllTags', topDataAllTags(tasks))

// console.log('Gloss for Scott:')
// console.log(topData(byTag('Scott', tasks)))
// console.log('====================')
// console.log('Gloss for everyone:')
// console.log(topDataAllTags(tasks))

// var compose = function(f,g) {

//   return function(x) {

//     return f(g(x));

//   };

// };

// var currying = function(fn) {
//   var args = [].slice.call(arguments, 1)
//   console.log(args)
//   return function() {
//     var newArgs = args.concat([].slice.call(arguments))
//     return fn.apply(null, newArgs)
//   }
// }

// var getWife = currying(function(a, b) {
//   return a + b
// }, 10)

// console.log(getWife(3))
// console.log(getWife(3))
