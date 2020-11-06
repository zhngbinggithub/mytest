package com.pinyougou.manager.controller;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.alibaba.dubbo.config.annotation.Reference;
import com.pinyougou.pojo.TbBrand;
import com.pinyougou.sellerGoods.service.BrandService;

import entity.PageResult;
import entity.Result;

/**
 * 品牌列表
 * @author Dang
 *
 */

@RestController  //Controller+responseBody
@RequestMapping("/brand")
public class BrandController {
	
	@Reference
	private BrandService brandService;
	
	//@Reference
	
	@RequestMapping("findAll")
	public List<TbBrand> findAll(){
		
		List<TbBrand> findAll = brandService.findAll();
		return findAll;
	}

	
	//分页查询
	@RequestMapping("findPage")
	public PageResult findPage(int page,int size) {
		
		return brandService.findPage(page, size);
	}
	
	
	@RequestMapping("/add")
	public Result add(@RequestBody TbBrand brand) {
		
		try {
			brandService.add(brand);
			return new Result(true,"添加成功！");
		} catch (Exception e) {
			return new Result(false,"失败成功！");
			
		}
		
	}	
	
	
	@RequestMapping("/findOne")
	public TbBrand findOne(Long id){
		return brandService.findOne(id);
	}
	
	//修改
	@RequestMapping("update")
	public Result update(@RequestBody TbBrand brand) {
			
			try {
				brandService.update(brand);
				return new Result(true,"修改成功！");
			} catch (Exception e) {
				return new Result(false,"修改成功！");
				
			}
			
		}
	
	//批量删除
	@RequestMapping("delete")
	public Result delete(Long [] ids) {
		
		try {
			brandService.delete(ids);
			
			return new Result(true,"删除成功！！");
			
		} catch (Exception e) {
			return new Result(false, "删除失败");
		}
		
	}
	
	
	@RequestMapping("/search")

	public PageResult search(@RequestBody TbBrand brand, int page, int size ){

		return brandService.findPage(brand, page, size);

	}
	
	
	//模板管理中的关联品牌查询 
	@RequestMapping("selectOptionList")
	public List<Map> selectOptionList(){
		
		return brandService.selectOptionList();
	}
	
}
