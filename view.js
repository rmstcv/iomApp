import { setElem, getObj, getDescr} from './model.js'
const class_header_tab = "header_nav_item"
const class_side_tab = "side_menu_item"
const class_side_tab_active = "side_nav_item__active"
const data_id = "data-object_id"
const class_header_tab_active = "header_nav_item__active"
const class_main_item = "main_item"
const main_menu_elem = document.querySelector(".main_menu")
const PADDING_LEFT = 1
const HEADER_NAV_ITEMS = [
  {
    obj_id: "IOM",
    object_name: "IOM",
    descr: "description",
     properties: `
      IInterview_Log, 
      IInterview_SnapForward,
      IInterview_Suspend,
      IInterview_Terminate,
      IInterview_Banners,
      IInterview_DefaultStyles,
      IInterview_Errors,
      IInterview_GlobalQuestions,
      IInterview_Info,
      IInterview_InterviewStatus,
      IInterview_MDM,
      IInterview_MessagesDocument,
      IInterview_Navigations,
      IInterview_NextPage,
      IInterview_Objects,
      IInterview_Pages,
      IInterview_ProjectName,
      IInterview_Properties,
      IInterview_Questions,
      IInterview_QuotaEngine,
      IInterview_RoutingContext,
      IInterview_SampleRecord,
      IInterview_SavePoints,
      IInterview_SessionToken,
      IInterview_Texts,
      IInterview_Title,
      IInterview_Version,
      IInterview_AutoSelectOther,
      IInterview_BannerTemplate,
      IInterview_Context,
      IInterview_ErrorTemplate,
      IInterview_GlobalQuestionPosition,	
      IInterview_GridTemplate,
      IInterview_LabelType,
      IInterview_Language,
      IInterview_LayoutTemplate,
      IInterview_Locale,
      IInterview_MustAnswer,
      IInterview_NavBarTemplate,
      IInterview_OffPathDataMode,
      IInterview_QuestionTemplate
      `
  },
  {
    obj_id: "Functions",
    object_name: "Functions",
    descr: "description",
    properties: `
      func_strings, 
      func_categorical, 
      func_conversions,
      func_misc,
      func_conversions,
      func_dates,
      func_lists,
      func_math,
      func_dataManagement
      `
  },
];


const dummy = {
    id:"1",
    group:"1",
    sub: "1",
    descr: {
        name: '1',
        descr: '1',
        info: '1',
        ex: ''
    }
}

function createHeader () {
  let div

  HEADER_NAV_ITEMS.forEach((item) => {
    div = document.createElement("div")
    div.classList.add(class_header_tab, "menu_item")
    div.setAttribute(data_id, `${item.obj_id}`)
    div.innerHTML = item.object_name
    main_menu_elem.appendChild(div)
  })

  document.querySelectorAll(`.${class_header_tab}`)[0].classList.add(class_header_tab_active)
}

function setActiveTabHeader(e) {

  if (e.target.classList.contains(class_header_tab) && !(e.target.classList.contains(class_header_tab_active))) {
    document.querySelector(`.${class_header_tab_active}`).classList.remove(class_header_tab_active)
    e.target.classList.add(class_header_tab_active)
    renderSideNav(e)
  }
}

function addHeaderListener() {
  document.addEventListener("click", setActiveTabHeader)
}

function createSideNav(idNav) {

  const side_menu_elem = document.querySelector(".side_menu")
  let sideItems

  HEADER_NAV_ITEMS.forEach((item) => {

    if (item.obj_id === idNav) {
      sideItems = item.properties.split(",")
    }
  })
  side_menu_elem.innerHTML = ""
  let div

  sideItems.forEach((item) => {
    item = item.trim()
    div = document.createElement("div")
    div.classList.add(class_side_tab)
    div.setAttribute(data_id, `${item}`)
    let currentObj = getObj(item)

    if (currentObj === undefined) {
      currentObj = getObj(dummy)
    }

    div.innerHTML = currentObj.id
    side_menu_elem.appendChild(div)
  })
  document.querySelectorAll(`.${class_side_tab}`)[0].classList.add(class_side_tab_active)
  createMainPage()
}

function renderSideNav() {

  const active_tab_item = document.querySelector(`.${class_header_tab_active}`)
  createSideNav(active_tab_item.getAttribute(data_id))
}

function setActiveTabSide(e) {
  if (e.target.classList.contains(class_side_tab) && !(e.target.classList.contains(class_side_tab_active))) {
    document.querySelector(`.${class_side_tab_active}`).classList.remove(class_side_tab_active)
    e.target.classList.add(class_side_tab_active)
    createMainPage()
  }
}

function addSideListener() {
  document.addEventListener("click", setActiveTabSide)
}

function createMainPage() {
  const main_page_elem = document.querySelector(".container_content")
  const side_active_elem = document.querySelector(`.${class_side_tab_active}`)
  let obj_item_id = side_active_elem.getAttribute(data_id)
  let div
  main_page_elem.innerHTML = ""
  const currentObj = getObj(obj_item_id)
  main_page_elem.innerHTML = `<div class="main_item_descr">${getDescr(currentObj)}</div></br>`
  let mainItems = currentObj.sub.split(", ")
  let currentObjSub = ""

  mainItems.forEach((mainItem) => {
      currentObjSub = getObj(`${mainItem}`)      
      div = document.createElement("div")
      
      if (currentObjSub.id) {
        div.classList.add("root_main_item")
        div.classList.add(class_main_item)
        div.setAttribute(data_id, `${currentObjSub.group}_${currentObjSub.id}`)
        div.innerHTML = `
        <div class="main_item_name" style="padding-left:${PADDING_LEFT}em;">${currentObjSub.id}</div>
      `
        main_page_elem.appendChild(div)
      }
  })
}

function createSubItems(parentItemElem, parentItemId) {
  let divMain
  
  
  const parentObj = getObj(parentItemId)

  let classColor = "main_item_red"
  let spaces = PADDING_LEFT
  let elem = parentItemElem

  while (elem.classList.contains("main_item")) {
    elem = elem.parentElement
    spaces = spaces + PADDING_LEFT
  }
  let descrMain_elem = document.createElement("div")
  
  descrMain_elem.innerHTML = `${getDescr(parentObj)}`

  descrMain_elem.classList.add("main_item_descr")
  descrMain_elem.style.paddingLeft = `${spaces.toString()}em`
  parentItemElem.appendChild(descrMain_elem)
  let subItems = parentObj.sub.split(", ")

  
  if (parentObj.sub) {
    subItems.forEach((mainItem) => {
      let currentObjSub = getObj(`${mainItem}`)
  
      divMain = document.createElement("div")
      divMain.classList.add(class_main_item)
      divMain.setAttribute(data_id, `${currentObjSub.group}_${currentObjSub.id}`)
  
      if (parentItemElem.classList.contains("main_item_red")) {
        classColor = "main_item_blue"
      }
    divMain.innerHTML = `
    <div class="main_item_name" style="padding-left:${spaces}em;">${currentObjSub.id}</div>
  `
      parentItemElem.appendChild(divMain)
      divMain.classList.add(classColor)
    })
  }
  
}

function showSubItems(e) {
  const parentElem = e.target.closest(".main_item")
  
  if (parentElem && e.target.classList.contains("main_item_name")) {
    const parentElemId = parentElem.getAttribute(data_id)
    
    if (!parentElem.classList.contains("main_item__active")) {
      parentElem.classList.add("main_item__active")
      setCurrentElem(parentElemId)
      
      createSubItems(parentElem, parentElemId)
    } else {
      
      let objMain = getObj(parentElemId)

      let spaces = PADDING_LEFT
      let elem = parentElem

      while (elem.classList.contains("main_item") && !elem.classList.contains("root_main_item")) {
        elem = elem.parentElement
        spaces = spaces + PADDING_LEFT
      }
      parentElem.classList.remove("main_item__active")
      parentElem.innerHTML = `
      <div class="main_item_name" style="padding-left:${spaces}em;">${objMain.id}</div>
      `

    }
  }
   
}

function addMainListener() {
  document.addEventListener("click", showSubItems)
}

function setCurrentElem(elem) {
  setElem(elem)
}

createHeader()
renderSideNav()
createMainPage()
addHeaderListener()
addSideListener()
addMainListener()