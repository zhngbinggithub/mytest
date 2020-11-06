package com.pinyougou.shop.controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import entity.Result;
import util.FastDFSClient;

@RestController
public class UploadController {
	
	@Value("${FILE_SERVER_URL}")
	private String file_server_url;
	
	@RequestMapping("/upload")
	public Result upload(MultipartFile file) {
		//获取文件名
		String originalFilename = file.getOriginalFilename();
		//获取文件扩展名
		String extName = originalFilename.substring(originalFilename.lastIndexOf(".")+1);
		
		try {
			util.FastDFSClient client=new FastDFSClient("classpath:config/fdfs_client.conf");
			
			//字节数组  扩展名
			String fileId = client.uploadFile(file.getBytes(), extName);
			System.out.println(fileId);
			//图片地址
			String url=file_server_url+fileId;
			//返回结果
			return new Result(true, url);
			
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			return new Result(false, "上传 失败！");
		}
		
		
	}

}
