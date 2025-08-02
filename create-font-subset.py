#!/usr/bin/env python3
"""
字体子集化脚本
用于提取婚礼邀请页面中实际使用的字符，生成小型字体文件
"""

import json
import os
import subprocess
import sys
import re
from pathlib import Path

def check_fonttools():
    """检查是否安装了fonttools"""
    try:
        subprocess.run(['pyftsubset', '--help'], capture_output=True, check=True)
        return True
    except (subprocess.CalledProcessError, FileNotFoundError):
        return False

def install_fonttools():
    """安装fonttools"""
    print("正在安装fonttools...")
    try:
        subprocess.run([sys.executable, '-m', 'pip', 'install', 'fonttools'], check=True)
        print("fonttools安装成功！")
        return True
    except subprocess.CalledProcessError:
        print("fonttools安装失败，请手动安装：pip install fonttools")
        return False

def extract_text_from_guest_file():
    """从guest.ts文件中提取文字内容"""
    guest_file = 'utils/guest.ts'
    
    if not os.path.exists(guest_file):
        print(f"⚠️  警告：找不到guest.ts文件: {guest_file}")
        return ""
    
    try:
        with open(guest_file, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # 提取所有中文字符
        chinese_chars = re.findall(r'[\u4e00-\u9fff]+', content)
        extracted_text = ''.join(chinese_chars)
        
        print(f"📝 从guest.ts中提取到 {len(extracted_text)} 个中文字符")
        print(f"提取的文字: {extracted_text}")
        
        return extracted_text
        
    except Exception as e:
        print(f"❌ 读取guest.ts文件失败: {e}")
        return ""

def merge_characters(base_chars, additional_chars):
    """合并字符，去重"""
    if not additional_chars:
        return base_chars
    
    # 合并并去重
    merged = base_chars + additional_chars
    unique_chars = ''.join(sorted(set(merged)))
    
    print(f"📊 字符统计:")
    print(f"   基础字符: {len(base_chars)} 个")
    print(f"   新增字符: {len(additional_chars)} 个")
    print(f"   合并后: {len(unique_chars)} 个")
    
    return unique_chars

def create_font_subset(source_file, output_file, characters):
    """创建字体子集"""
    if not os.path.exists(source_file):
        print(f"错误：源字体文件不存在: {source_file}")
        return False
    
    # 创建输出目录
    output_dir = os.path.dirname(output_file)
    os.makedirs(output_dir, exist_ok=True)
    
    # 构建pyftsubset命令
    cmd = [
        'pyftsubset',
        source_file,
        f'--output-file={output_file}',
        f'--text={characters}',
        '--layout-features=*'
    ]
    
    try:
        print(f"正在处理字体: {os.path.basename(source_file)}")
        print(f"字符数量: {len(characters)}")
        
        result = subprocess.run(cmd, capture_output=True, text=True, check=True)
        
        # 检查输出文件大小
        if os.path.exists(output_file):
            original_size = os.path.getsize(source_file)
            subset_size = os.path.getsize(output_file)
            reduction = ((original_size - subset_size) / original_size) * 100
            
            print(f"✅ 字体子集创建成功!")
            print(f"   原始大小: {original_size / 1024:.1f} KB")
            print(f"   子集大小: {subset_size / 1024:.1f} KB")
            print(f"   减少: {reduction:.1f}%")
        else:
            print("❌ 输出文件未生成")
            return False
            
    except subprocess.CalledProcessError as e:
        print(f"❌ 字体子集化失败: {e}")
        print(f"错误输出: {e.stderr}")
        return False
    
    return True

def main():
    """主函数"""
    print("🎨 婚礼邀请字体子集化工具")
    print("=" * 50)
    
    # 检查fonttools
    if not check_fonttools():
        print("未检测到fonttools，正在安装...")
        if not install_fonttools():
            return
    
    # 提取guest.ts中的文字
    print("\n📖 提取guest.ts中的文字...")
    guest_text = extract_text_from_guest_file()
    
    # 读取配置
    try:
        with open('font-subset-config.json', 'r', encoding='utf-8') as f:
            config = json.load(f)
    except FileNotFoundError:
        print("❌ 找不到配置文件: font-subset-config.json")
        return
    except json.JSONDecodeError:
        print("❌ 配置文件格式错误")
        return
    
    # 处理中文字体 - 合并guest.ts中的文字
    print("\n📝 处理中文字体...")
    chinese_config = config['chinese_font']
    base_chinese_chars = chinese_config['characters']
    merged_chinese_chars = merge_characters(base_chinese_chars, guest_text)
    
    success1 = create_font_subset(
        chinese_config['source_file'],
        chinese_config['output_file'],
        merged_chinese_chars
    )
    
    # 处理英文字体
    print("\n🔤 处理英文字体...")
    english_config = config['english_font']
    success2 = create_font_subset(
        english_config['source_file'],
        english_config['output_file'],
        english_config['characters']
    )
    
    # 总结
    print("\n" + "=" * 50)
    if success1 and success2:
        print("🎉 所有字体子集化完成！")
        print("\n📋 下一步操作：")
        print("1. 更新 styles/globals.css 中的字体引用")
        print("2. 测试字体显示效果")
        print("3. 部署优化后的字体文件")
    else:
        print("❌ 字体子集化过程中出现错误")

if __name__ == "__main__":
    main() 