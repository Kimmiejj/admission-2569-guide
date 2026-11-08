// The image is generated on the device; no student data is sent to a server.
const exportButton=document.createElement('button');
exportButton.id='makeImage'; exportButton.className='make-image';
exportButton.textContent='✳  สร้างภาพสรุปของฉัน';
$('clearRanks').before(exportButton);
const imageDialog=$('imageDialog'); let imageBlob=null; let imageUrl='';

function createSummaryCanvas(){
  const canvas=document.createElement('canvas'); canvas.width=1080;
  const ctx=canvas.getContext('2d');
  const font=(size,weight=400)=>`${weight} ${size}px Prompt, sans-serif`;
  const wrap=(text,width,size=29,weight=500)=>{
    ctx.font=font(size,weight);
    const pieces=typeof Intl.Segmenter==='function'?[...new Intl.Segmenter('th',{granularity:'grapheme'}).segment(text)].map(x=>x.segment):Array.from(text);
    const lines=[]; let line='';
    for(const char of pieces){const next=line+char;if(line&&ctx.measureText(next).width>width){lines.push(line.trim());line=char.trimStart()}else line=next}if(line)lines.push(line.trim());return lines;
  };
  const entries=ranking.map(id=>{const p=plans.find(item=>item.id===id);return {plan:p,lines:wrap(p.name,660,29,500)}});
  const rows=entries.map(e=>Math.max(104,48+e.lines.length*42));
  const rankContent=rows.reduce((a,b)=>a+b,0)||100;
  canvas.height=1330+rankContent;
  const h=canvas.height;
  const box=(x,y,w,height,r,color)=>{ctx.fillStyle=color;ctx.beginPath();ctx.roundRect(x,y,w,height,r);ctx.fill()};
  const text=(value,x,y,size,color='#233d30',weight=400)=>{ctx.font=font(size,weight);ctx.fillStyle=color;ctx.fillText(value,x,y)};
  const line=(x1,y1,x2,y2,color='#e3eadd')=>{ctx.strokeStyle=color;ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(x1,y1);ctx.lineTo(x2,y2);ctx.stroke()};
  ctx.fillStyle='#f6f7ee';ctx.fillRect(0,0,1080,h);
  ctx.fillStyle='#dfe9cf';ctx.beginPath();ctx.arc(1020,80,230,0,Math.PI*2);ctx.fill();
  ctx.fillStyle='#ebeedc';ctx.beginPath();ctx.arc(25,h-30,190,0,Math.PI*2);ctx.fill();
  text('✳  ทางต่อ ม.4',72,84,28,'#386e4b',600);text('MY NEXT CHAPTER  /  2569',72,142,19,'#7c967a',600);
  text('สรุปเส้นทางของฉัน',72,205,46,'#1e382b',600);text('เกรดและอันดับแผนการเรียน',72,251,26,'#79907b');
  box(60,290,960,295,24,'#ffffff');
  text('01',92,350,21,'#9bb894',600);text('เกรดภาคเรียนล่าสุด',150,350,29,'#243f30',600);
  line(92,375,988,375);
  const gradeLabels={1:'1.00–1.99',2:'2.00–2.99',3:'3.00 ขึ้นไป'};
  subjects.forEach(([id,name],i)=>{const x=96+(i%2)*440,y=422+Math.floor(i/2)*55;const grade=grades[id];text(name,x,y,23,'#74887a');text(grade===undefined?'ยังไม่ได้เลือก':gradeLabels[grade],x+225,y,23,grade===undefined?'#a8b3a8':'#315d3b',500)});
  box(60,610,960,310,24,'#ffffff');
  text('02',92,670,21,'#9bb894',600);text('คะแนนสะสม 5 ภาคเรียน',150,670,29,'#243f30',600);
  line(92,695,988,695);
  const avgKeys=['gpa','math','science','english','thai','social'];
  avgKeys.forEach((key,i)=>{const x=96+(i%2)*440,y=742+Math.floor(i/2)*55;const name=key==='gpa'?'เฉลี่ยรวม':labels[key]+'พื้นฐาน';text(name,x,y,23,'#74887a');text(averages[key]===undefined?'ยังไม่ได้กรอก':averages[key].toFixed(2),x+225,y,23,averages[key]===undefined?'#a8b3a8':'#315d3b',500)});
  box(60,945,960,200+rankContent,24,'#ffffff');
  text('03',92,1005,21,'#9bb894',600);text('อันดับแผนที่สนใจ',150,1005,29,'#243f30',600);
  text(`${ranking.length} ตัวเลือก`,810,1005,22,'#8ea18d');line(92,1030,988,1030);
  let y=1052;
  if(!entries.length){text('ยังไม่ได้เลือกแผนการเรียน',100,y+52,26,'#a2b0a3');y+=100}
  entries.forEach(({plan,lines},i)=>{
    box(96,y+11,56,56,15,'#edf4e6');text(String(i+1).padStart(2,'0'),107,y+48,22,'#628960',600);
    lines.forEach((s,j)=>text(s,172,y+43+j*42,29,'#243f30',500));
    const s=status(plan), label=s==='pass'?'ผ่านเกณฑ์คะแนนเบื้องต้น':s==='fail'?'คะแนนเบื้องต้นยังไม่ถึงเกณฑ์':'รอคะแนนสะสม';
    text(label,172,y+44+lines.length*42,19,s==='pass'?'#6c9664':s==='fail'?'#b67f60':'#a1afa1');
    y+=rows[i]; if(i<entries.length-1)line(170,y,985,y,'#eff2eb');
  });
  const footerY=1185+rankContent;
  text('✳',78,footerY+6,35,'#d1a174');
  text('ผลนี้ใช้เพื่อวางแผน ไม่ใช่การยืนยันสิทธิ์หรือผลการคัดเลือก',125,footerY,21,'#6f8872');
  text('เทียบกับใบ ปพ.1 และตรวจสอบเงื่อนไขของโรงเรียนอีกครั้ง',125,footerY+38,21,'#8b9e8c');
  text('ทางต่อ ม.4  ·  ปีการศึกษา 2569',72,h-42,18,'#9aac9a');
  return canvas;
}

function canvasBlob(canvas){return new Promise((resolve,reject)=>canvas.toBlob(blob=>blob?resolve(blob):reject(new Error('ไม่สามารถสร้างภาพได้')),'image/png'))}
exportButton.addEventListener('click',async()=>{
  exportButton.disabled=true;exportButton.textContent='กำลังสร้างภาพ...';$('imageMessage').textContent='';
  try{
    if(document.fonts)await document.fonts.ready;
    const canvas=createSummaryCanvas();imageBlob=await canvasBlob(canvas);
    if(imageUrl)URL.revokeObjectURL(imageUrl);imageUrl=URL.createObjectURL(imageBlob);$('summaryImage').src=imageUrl;
    if(typeof imageDialog.showModal==='function')imageDialog.showModal();else imageDialog.setAttribute('open','');
  }catch(error){alert('สร้างภาพไม่สำเร็จ กรุณาลองอีกครั้ง')}
  finally{exportButton.disabled=false;exportButton.textContent='✳  สร้างภาพสรุปของฉัน'}
});
function downloadSummary(){if(!imageBlob)return;const a=document.createElement('a');a.href=imageUrl;a.download='m4-my-summary.png';document.body.appendChild(a);a.click();a.remove();$('imageMessage').textContent='ดาวน์โหลดภาพแล้ว ตรวจสอบในไฟล์ดาวน์โหลดของอุปกรณ์';}
$('downloadImage').addEventListener('click',downloadSummary);
$('shareImage').addEventListener('click',async()=>{
  if(!imageBlob)return;
  const file=new File([imageBlob],'m4-my-summary.png',{type:'image/png'});
  if(navigator.canShare&&navigator.canShare({files:[file]})){
    try{await navigator.share({files:[file],title:'สรุปแผนการเรียน ม.4'});$('imageMessage').textContent='เลือกบันทึกภาพหรือแชร์ต่อได้จากเมนูของอุปกรณ์'}catch(error){if(error.name!=='AbortError'){$('imageMessage').textContent='แชร์ภาพไม่ได้ กรุณากดดาวน์โหลด PNG แทน'}}
  }else{downloadSummary();$('imageMessage').textContent='เบราว์เซอร์นี้ดาวน์โหลดภาพลงไฟล์ จากนั้นสามารถบันทึกเข้าแกลเลอรีได้'}
});
$('closeImage').addEventListener('click',()=>{if(typeof imageDialog.close==='function')imageDialog.close();else imageDialog.removeAttribute('open')});
