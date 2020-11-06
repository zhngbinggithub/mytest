package com.pinyougou.sellerGoods.service;

import java.util.List;
import java.util.Map;

import com.pinyougou.pojo.TbBrand;

import entity.PageResult;


public interface BrandService {
	
	//品牌列表
	public List<TbBrand> findAll();
	
	//分页
	public PageResult  findPage(int pageNum,int pageSize);
	public PageResult findPage(TbBrand brand, int pageNum,int pageSize);
	
	public void add(TbBrand brand);

	public TbBrand findOne(Long id);

	public void update(TbBrand brand);
	
	//批量删除
	public void delete(Long [] ids);
	
	/**
	 * 返回列表数据 //模板管理中的关联品牌查询
	 * @return
	 */
	public List<Map> selectOptionList();

}
