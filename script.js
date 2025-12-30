/**
 * 尹毓恪 - 致粉丝的信
 * JavaScript 交互脚本
 * 功能：拆封动画、打开计数、内容渲染、增强效果
 */

// ==================== 可配置内容常量 ====================
const LETTER_CONFIG = {
    // 歌手署名
    artistName: '尹毓恪',
    
    // 信标题
    title: '致粉丝的信',
    
    // 副标题
    subtitle: 'A Letter For You',
    
    // 正文段落（数组）
    paragraphs: [
        '亲爱的你，当你打开这封信的时候，我想让你知道，每一个字都是我用心写下的。就像春天的花朵慢慢绽放，像海浪一次次拍打着岸边，我的思绪也一遍遍地飞向你。',
        
        '生活就像一部法国新浪潮电影，充满了意外和惊喜。我们在时光的长河中相遇，在音乐的旋律中相知。每一次演出，每一首歌，都是我想要对你说的话。',
        
        {
            type: 'quote',
            content: '音乐是时间的诗，歌声是灵魂的信。<br>而你，是我最想唱给这个世界听的旋律。'
        },
        
        '我希望我的歌声能陪伴你度过每一个春夏秋冬，无论是阳光明媚的日子，还是风雨交加的夜晚。就像海啸过后依然会有平静，黑暗过后必然会迎来黎明。',
        
        '感谢你的每一次倾听，每一次支持。这封信不仅是我写给你的，也是你们所有人给我的力量的见证。让我们一起，在这个充满诗意和青春的时代里，勇敢地追逐梦想，哪怕前路漫漫，也要相信美好终将到来。'
    ],
    
    // 落款前缀
    signaturePrefix: '永远爱你的',
    
    // 落款日期
    signatureDate: '2025.12.30',
    
    // 页脚彩蛋
    footerEasterEgg: '愿所有美好的事物都能在春风里重逢 🌸'
};

// ==================== 全局变量 ====================
let hasOpened = false; // 标记是否已拆封

// ==================== 核心功能：拆封交互 ====================
/**
 * 初始化信封拆封交互
 * 点击信封 → 信封消失 → 信纸展开 → 计数+1
 */
function initEnvelopeInteraction() {
    const envelopeContainer = document.getElementById('envelopeContainer');
    const letterContainer = document.getElementById('letterContainer');

    if (!envelopeContainer || !letterContainer) {
        console.error('无法找到信封或信纸容器元素');
        return;
    }

    envelopeContainer.addEventListener('click', function() {
        if (hasOpened) return; // 防止重复点击
        
        hasOpened = true;
        
        // 信封消失动画
        envelopeContainer.classList.add('opened');
        
        // 延迟显示信纸（等待信封动画完成）
        setTimeout(() => {
            letterContainer.classList.add('visible');
            
            // 打开成功后，增加计数
            incrementOpenCount();
        }, 600);
    });
}

// ==================== 功能：打开次数统计 ====================
/**
 * 增加打开次数计数
 * 使用 localStorage 存储，仅在成功拆封时调用
 */
function incrementOpenCount() {
    const STORAGE_KEY = 'letter_open_count';
    
    // 从 localStorage 获取当前计数
    let count = localStorage.getItem(STORAGE_KEY);
    
    if (count === null || count === undefined) {
        count = 0;
    } else {
        count = parseInt(count, 10);
    }
    
    // 计数加 1
    count++;
    
    // 保存回 localStorage
    localStorage.setItem(STORAGE_KEY, count);
    
    // 显示计数（带动画效果）
    displayOpenCount(count);
}

/**
 * 显示打开次数（带数字滚动动画）
 * @param {number} targetCount - 目标计数值
 */
function displayOpenCount(targetCount) {
    const counterElement = document.getElementById('openCount');
    
    if (!counterElement) {
        console.error('无法找到计数器元素');
        return;
    }
    
    let currentDisplay = 0;
    const increment = Math.ceil(targetCount / 40);
    const duration = 1500; // 动画持续时间（毫秒）
    const intervalTime = duration / (targetCount / increment);
    
    const timer = setInterval(() => {
        currentDisplay += increment;
        if (currentDisplay >= targetCount) {
            currentDisplay = targetCount;
            clearInterval(timer);
        }
        counterElement.textContent = currentDisplay.toLocaleString();
    }, intervalTime);
}

// ==================== 功能：渲染信件内容 ====================
/**
 * 根据配置对象动态渲染信件内容
 * 包括标题、正文段落、签名等
 */
function renderLetterContent() {
    // 设置标题
    const titleElement = document.getElementById('letterTitle');
    const subtitleElement = document.getElementById('letterSubtitle');
    
    if (titleElement) {
        titleElement.textContent = LETTER_CONFIG.title;
    }
    if (subtitleElement) {
        subtitleElement.textContent = LETTER_CONFIG.subtitle;
    }
    
    // 渲染正文段落
    const contentContainer = document.getElementById('letterContent');
    
    if (!contentContainer) {
        console.error('无法找到信件内容容器元素');
        return;
    }
    
    let contentHTML = '';
    
    // 遍历段落配置
    LETTER_CONFIG.paragraphs.forEach(item => {
        if (typeof item === 'string') {
            // 普通段落
            contentHTML += `<p class="letter-paragraph">${item}</p>`;
        } else if (item.type === 'quote') {
            // 引用/诗句
            contentHTML += `<div class="letter-quote">${item.content}</div>`;
        }
    });
    
    // 添加签名区域
    contentHTML += `
        <div class="letter-signature">
            <div>${LETTER_CONFIG.signaturePrefix}</div>
            <div class="signature-name">${LETTER_CONFIG.artistName}</div>
            <div class="signature-date">${LETTER_CONFIG.signatureDate}</div>
        </div>
    `;
    
    contentContainer.innerHTML = contentHTML;
    
    // 设置页脚彩蛋
    const footerElement = document.getElementById('footerMessage');
    if (footerElement) {
        footerElement.textContent = LETTER_CONFIG.footerEasterEgg;
    }
}

// ==================== 增强交互效果 ====================
/**
 * 初始化页面增强效果
 * 包括：鼠标视差效果、段落滚动淡入动画
 */
function initEnhancedEffects() {
    // 鼠标视差效果（仅在桌面端启用）
    if (window.innerWidth > 768) {
        document.addEventListener('mousemove', handleMouseParallax);
    }

    // 段落滚动淡入效果
    initScrollFadeIn();
}

/**
 * 鼠标视差效果处理函数
 * 插图元素会根据鼠标位置产生轻微位移
 */
function handleMouseParallax(e) {
    const moveX = (e.clientX - window.innerWidth / 2) * 0.008;
    const moveY = (e.clientY - window.innerHeight / 2) * 0.008;
    
    const spring = document.querySelector('.illustration-spring');
    const wave = document.querySelector('.illustration-wave');
    
    if (spring) {
        spring.style.transform = `translate(${moveX}px, ${moveY}px)`;
    }
    if (wave) {
        wave.style.transform = `translate(${-moveX}px, ${-moveY}px)`;
    }
}

/**
 * 初始化段落滚动淡入效果
 * 使用 Intersection Observer API 监听元素进入视口
 */
function initScrollFadeIn() {
    // 配置观察器选项
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -80px 0px'
    };

    // 创建交叉观察器
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeIn 1s ease-out forwards';
            }
        });
    }, observerOptions);

    // 等待信纸显示后，为段落添加观察器
    setTimeout(() => {
        const paragraphs = document.querySelectorAll('.letter-paragraph, .letter-quote');
        paragraphs.forEach(p => {
            p.style.opacity = '0'; // 初始设为透明
            observer.observe(p);
        });
    }, 1500);
}

// ==================== 页面初始化 ====================
/**
 * 页面加载完成后的初始化流程
 */
window.addEventListener('DOMContentLoaded', function() {
    console.log('信件页面初始化中...');
    
    // 1. 渲染信件内容
    renderLetterContent();
    
    // 2. 初始化拆封交互
    initEnvelopeInteraction();
    
    // 3. 初始化增强效果
    initEnhancedEffects();
    
    console.log('信件页面加载完成！');
});

// ==================== 工具函数 ====================
/**
 * 重置打开次数（用于调试）
 * 在浏览器控制台运行: resetOpenCount()
 */
function resetOpenCount() {
    localStorage.removeItem('letter_open_count');
    const counterElement = document.getElementById('openCount');
    if (counterElement) {
        counterElement.textContent = '0';
    }
    console.log('打开次数已重置');
}

// 将工具函数暴露到全局（方便调试）
window.resetOpenCount = resetOpenCount;

