import {iomData} from './obj_data.js'
import {funcData} from './obj_data_func.js'

const allData = [...iomData, ...funcData]

let currentElem = ""

let setElem = (elem) => {
    currentElem = elem
} 

function getObj(obj) {
    let targetObj = {}
    allData.forEach((iomDataObj) => {
            if (`${iomDataObj.group}_${iomDataObj.id}` === obj) {
            targetObj = iomDataObj
        }
    })
    
    return targetObj
}
function getDescr(obj) {
    let mokup = ''
     mokup = `
      <div class="obj_name">${obj.descr.name}</div>
      <div class="obj_descr">${obj.descr.descr}</div>
      <div class="obj_info">${obj.descr.info}</div>
      <div class="obj_ex">${obj.descr.ex}</div>
    `
    // }  
    
    return mokup
  }

export {setElem, getObj, getDescr}