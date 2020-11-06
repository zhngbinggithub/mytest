package com.pinyougou.shop.service;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import com.alibaba.dubbo.config.annotation.Reference;
import com.alibaba.dubbo.config.annotation.Service;
import com.pinyougou.pojo.TbSeller;
import com.pinyougou.sellerGoods.service.SellerService;

/**
 * 认证类
 * @author Dang
 *
 */
@Service
public class UserDetailsServiceImpl implements UserDetailsService {
	
	
	
	private SellerService sellerService;
	

	//username:用户在登录页面传递过来的用户名
	/*@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		
		System.out.println("经过UserDetailsServiceImpl");
		//GrantedAuthority每一个角色
		//构建角色列表
		List<GrantedAuthority> authorities=new ArrayList();
		authorities.add(new SimpleGrantedAuthority("ROLE_SELLER"));
		//authorities 当前用户拥有哪些角色
		return new User(username, "123456", authorities);
	}*/
	


	public void setSellerService(SellerService sellerService) {
		this.sellerService = sellerService;
	}


	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		
		System.out.println("经过UserDetailsServiceImpl");
		//GrantedAuthority每一个角色
		//构建角色列表
		List<GrantedAuthority> authorities=new ArrayList();
		authorities.add(new SimpleGrantedAuthority("ROLE_SELLER"));
		TbSeller seller = sellerService.findOne(username);
		
		if(seller !=null) {
			if(seller.getStatus().equals("1")) {
				//authorities 当前用户拥有哪些角色
				return new User(username, seller.getPassword(), authorities);
			}else {
				
				return null;
			}
			
		}else {
			
			return null;
		}
		
	}


}
