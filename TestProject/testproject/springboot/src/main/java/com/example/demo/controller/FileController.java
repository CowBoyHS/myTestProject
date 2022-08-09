package com.example.demo.controller;

import cn.hutool.core.io.FileUtil;
import cn.hutool.core.util.IdUtil;
import cn.hutool.core.util.StrUtil;
import cn.hutool.http.server.HttpServerResponse;
import cn.hutool.json.JSON;
import cn.hutool.json.JSONArray;
import cn.hutool.json.JSONObject;
import com.example.demo.common.Result;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.OutputStream;
import java.net.URLEncoder;
import java.util.List;

@RestController
@RequestMapping("/files")
public class FileController {
  @Value("${server.port}")
  private String port;

  @Value("43.142.141.186")
  private  String ip;
  //上传接口
  @PostMapping("/upload")
//  @RequestMapping("/upload")
  public Result<?> upload( MultipartFile file) throws IOException {
    String originalFilename = file.getOriginalFilename();
    String flag = IdUtil.fastSimpleUUID();
    String rootFilePath =  System.getProperty("user.dir") + "/files/" + flag + "_" + originalFilename;//获得当前文件完整路径的名称,唯一
    FileUtil.writeBytes(file.getBytes(),rootFilePath);//文件的写入
    return Result.success(ip + ":" + port + "/files/" + flag); //返回结果url
  }

  //富文本编辑器上传接口
  @PostMapping("/editor/upload")
  public JSON editorUpload(MultipartFile file) throws IOException {
    String originalFilename = file.getOriginalFilename();
    String flag = IdUtil.fastSimpleUUID();
    String rootFilePath =  System.getProperty("user.dir") + "/files/" + flag + "_" + originalFilename;//获得当前文件完整路径的名称,唯一
    FileUtil.writeBytes(file.getBytes(),rootFilePath);//文件的写入
    String url = ip + ":" + port + "/files/" + flag;
    JSONObject json = new JSONObject();
    json.set( "errno",0);
    JSONArray arr =  new JSONArray();
    JSONObject data = new JSONObject();
    data.set("url",url);
    arr.add(data);
    json.set("data",arr);
    return json; //返回结果url
  }
  //下载接口
  @GetMapping("/{flag}")
  public void getFiles(@PathVariable String flag, HttpServletResponse response) {
    OutputStream os;//新建一个输出流对象
    String basePath = System.getProperty("user.dir") + "/files/";//定义获取文件的根路径
    List<String> fileNames = FileUtil.listFileNames(basePath);
    String fileName = fileNames.stream().filter(name -> name.contains(flag)).findAny().orElse("");
    try{
      if(StrUtil.isNotBlank(fileName)) {
        response.addHeader("Content-Disposition","attachment;filename=" + URLEncoder.encode(fileName,"UTF-8"));
        response.setContentType("application/octet-stream");
        byte[] bytes = FileUtil.readBytes(basePath + fileName);
        os = response.getOutputStream();
        os.write(bytes);
        os.flush();
        os.close();
      }
    }catch (Exception e) {
      System.out.println("文件下载失败");
    }
  }
}
