export type Lesson = { slug:string; title:string; duration:string; vimeoId:string; summary?:string; downloads?:{label:string; href:string}[] };
export const lessons: Lesson[] = [
  { slug:"plan-set-anatomy", title:"Plan Set Anatomy: Title Block to Index", duration:"12:43", vimeoId:"123456789", summary:"Find sheet numbers, revisions, scales, and key notes fast.", downloads:[{label:"Plan Set Anatomy (PDF)", href:"/downloads/Plan_Set_Anatomy.pdf"}]},
  { slug:"architectural-basics", title:"Architectural Sheets (A) – Plans, Elevations, Sections", duration:"15:02", vimeoId:"234567890", downloads:[{label:"Estimator’s Takeoff Checklist (PDF)", href:"/downloads/Estimators_Takeoff_Checklist.pdf"}]},
];
