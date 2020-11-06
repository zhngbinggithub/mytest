package com.pinyougou.manager.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/login")
public class LoginController {
	
	
	@RequestMapping("/loginName")
	public Map loginName() {
		
		//获取用户名
		String loginName = SecurityContextHolder.getContext().getAuthentication().getName();
		Map map=new HashMap<>();
		map.put("loginname", loginName);
		return map;
	}

}
