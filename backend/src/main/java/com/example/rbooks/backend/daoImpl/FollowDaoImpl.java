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
import javax.persistence.Table;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class FollowDaoImpl implements FollowDao {

  private final FollowauthorRepository followauthorRepository;
  private final FollowbookRepository followbookRepository;

  @Autowired
  public FollowDaoImpl(FollowauthorRepository followauthorRepository,
      FollowbookRepository followbookRepository) {
    this.followauthorRepository = followauthorRepository;
    this.followbookRepository = followbookRepository;
  }

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
  public Boolean exsitsFollowAuthor(FollowauthorId followauthorId) {
    return followauthorRepository.existsByFollowauthorid(followauthorId);
  }

  @Override
  public Boolean exsitsFollowBook(FollowbookId followbookId) {
    return followbookRepository.existsByFollowbookid(followbookId);
  }

  @Override
  public int addFollowAuthor(FollowauthorId id) {
    Followauthor followauthor = new Followauthor();
    followauthor.setFollowauthorid(id);
    if (followauthorRepository.existsByFollowauthorid(id)) { //如果已经有了就返回-1
      return -1;
    }
    followauthorRepository.save(followauthor);
    return 1;
  }

  @Transactional //删除需要 事务
  @Override
  public int deleteFollowAuthor(FollowauthorId id) {

    if (!followauthorRepository.existsByFollowauthorid(id)) {
      return -1; //不包含的话，删除自然失败
    }
    followauthorRepository.deleteByFollowauthorid(id);
    return 1;
  }

  @Override
  public int addFollowBook(FollowbookId id) {
    Followbook followbook = new Followbook();
    followbook.setFollowbookid(id);
    if (followbookRepository.existsByFollowbookid(id)) {
      return -1;
    }
    followbookRepository.save(followbook);
    return 1;
  }

  @Transactional
  @Override
  public int deleteFollowBook(FollowbookId id) {

    if (!followbookRepository.existsByFollowbookid(id)) {
      return -1;
    }
    followbookRepository.deleteByFollowbookid(id);
    return 1;
  }
}
