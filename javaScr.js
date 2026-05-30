// 1. ตั้งค่าตัวแปรสำคัญ
const apiKey = '81558eab7b8a6fbf802580736645107e'; 
const searchBtn = document.getElementById('search-btn');
const cityInput = document.getElementById('city-input');

const cityName = document.getElementById('city-name');
const temperature = document.getElementById('temperature');
const description = document.getElementById('description');

// 2. สร้างฟังก์ชันสำหรับดึงข้อมูลจาก API
async function getWeather(city) {
    // URL สำหรับเรียกข้อมูล (เปลี่ยนหน่วยเป็น เซลเซียส ด้วย &units=metric และภาษาไทยด้วย &lang=th)
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=th`;

    try {
        // ส่งคำขอไปยัง API และรอคำตอบ
        const response = await fetch(url);
        
        // ถ้าค้นหาเมืองไม่เจอ หรือ API มีปัญหา
        if (!response.ok) {
            throw new Error('ไม่พบข้อมูลเมืองนี้');
        }

        // แปลงข้อมูลที่ได้ให้อยู่ในรูปแบบ JSON (Object ที่ JS เข้าใจง่าย)
        const data = await response.json();
        
        // นำข้อมูลไปแสดงผลบนหน้าเว็บ (DOM Manipulation)
        updateUI(data);

    } catch (error) {
        // จัดการกรณีเกิดข้อผิดพลาด
        alert(error.message);
    }
}

// 3. ฟังก์ชันสำหรับอัปเดตหน้าตา UI ด้วยข้อมูลจริง
function updateUI(data) {
    cityName.innerText = data.name; // ชื่อเมือง
    temperature.innerText = `${Math.round(data.main.temp)}°C`; // อุณหภูมิ (ปัดเศษทศนิยม)
    description.innerText = data.weather[0].description; // รายละเอียดสภาพอากาศ เช่น "ฝนตกเล็กน้อย"
}

// 4. ดักจับเหตุการณ์เมื่อผู้ใช้กดปุ่มค้นหา
searchBtn.addEventListener('click', () => {
    const city = cityInput.value.trim();
    if (city !== '') {
        getWeather(city);
    } else {
        alert('กรุณาพิมพ์ชื่อเมืองก่อนกดค้นหา');
    }
});

// (เสริม) ดักจับเหตุการณ์เมื่อผู้ใช้กดปุ่ม Enter ในช่องพิมพ์
cityInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        searchBtn.click();
    }
});