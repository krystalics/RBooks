package com.example.rbooks.backend.daoImpl;

import com.example.rbooks.backend.dao.FollowDao;
import com.example.rbooks.backend.entity.Followauthor;
import com.example.rbooks.backend.entity.FollowauthorId;
import com.example.rbooks.backend.entity.FollowauthorRepository;
import com.example.rbooks.backend.entity.Followbook;
import com.example.rbooks.backend.entity.FollowbookId;
import com.example.rbooks.backend.entity.FollowbookRepository;
import java.util.ArrayList;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class FollowDaoImpl implements FollowDao {

  @Autowired
  private FollowauthorRepository followauthorRepository;
  @Autowired
  private FollowbookRepository followbookRepository;

  @Override
  public List<Followauthor> getAllUsers() { //将整张表遍历
    Iterable<Followauthor> followauthors = followauthorRepository.findAll();
    List<Followauthor> followauthorList = new ArrayList<>();
    for (Followauthor followauthor : followauthors) {
      followauthorList.add(followauthor);
    }

    return followauthorList;
  }

  @Override
  public List<Followbook> getAllBooks() {
    Iterable<Followbook> followbooks = followbookRepository.findAll();
    List<Followbook> followbookList = new ArrayList<>();
    for (Followbook followbook : followbooks) {
      followbookList.add(followbook);
    }
    return followbookList;
  }

  @Override
  public int addFollowAuthor(FollowauthorId id) {
    Followauthor followauthor = new Followauthor();
    followauthor.setFollowauthorId(id);
    if (followauthorRepository.findByFollowauthorId(id).equals(followauthor)) { //如果已经有了就返回-1
      return -1;
    }
    followauthorRepository.save(followauthor);
    return 1;
  }

  @Override
  public int deleteFollowAuthor(FollowauthorId id) {
    Followauthor followauthor = new Followauthor();
    followauthor.setFollowauthorId(id);
    if (!followauthorRepository.findByFollowauthorId(id).equals(followauthor)) {
      return -1; //不包含的话，删除自然失败
    }
    followauthorRepository.delete(followauthor);
    return 1;
  }

  @Override
  public int addFollowBook(FollowbookId id) {
    Followbook followbook=new Followbook();
    followbook.setFollowbookId(id);
    if(followbookRepository.findByFollowbookId(id).equals(followbook)){
      return -1;
    }
    followbookRepository.save(followbook);
    return 1;
  }

  @Override
  public int deleteFollowBook(FollowbookId id) {
    Followbook followbook=new Followbook();
    followbook.setFollowbookId(id);
    if(!followbookRepository.findByFollowbookId(id).equals(followbook)){
      return -1;
    }
    followbookRepository.delete(followbook);
    return 1;
  }
}
