//
//  ThirdViewController.swift
//  Forest1
//
//  Created by 釜谷 on 2018/08/02.
//  Copyright © 2018年 Regina. All rights reserved.
//

import UIKit
import XLPagerTabStrip

import FirebaseAuth
import FirebaseDatabase
import FBSDKLoginKit


class ThirdViewController: UIViewController, IndicatorInfoProvider {
    var itemInfo: IndicatorInfo = "Third"

    var ref: DatabaseReference!
    
    func indicatorInfo(for pagerTabStripController: PagerTabStripViewController) -> IndicatorInfo {
        return itemInfo
    }
    
    override func viewDidLoad() {
        super.viewDidLoad()

        // Do any additional setup after loading the view.
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
}
