import React, { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { Sidebarinfo } from "../App";
import { Link } from "react-router-dom";

function Sidebar() {
  const { hidesidebar, setHidesidebar } = useContext(Sidebarinfo);
  const { isDark, setisDark } = useContext(Sidebarinfo);
  const selectedListItemBackgroundColor = {
    backgroundColor: "#31826c",
    color: "#ffffff",
  };
  const notSelectedListItemBackgroundColor = {};
  const SidebarStyle = { backgroundColor: "#9bd3c4 ", color: "#404040" };
  const itemTreeStyle = { backgroundColor: "#6fbcb2   ", color: "#CCCCCC" };
  const company = [
    {
      name: "Hasan Kurtini",
      image: "LOGO1beyaz.png",
    },
  ];
  const user = [
    {
      username: "Hasan Kurtini",
      image: "hasan.jpeg",
      status: true,
      authority: "Admin",
    },
  ];

  const sidebaritems = [
    { name: "Analiz", menu: [], icon: "fa-line-chart" },
    {
      name: "Randevu",
      menu: [
        "Randevu Ekle",
        "Randevu Listesi",
        "Ön Kayıt Ekle",
        "Ön Kayıt Listesi",
      ],
      icon: "fa-calendar-plus-o",
    },
    {
      name: "Ajanda",
      menu: ["Plan Ekle", "Ajanda"],
      icon: "fa-calendar",
    },

    {
      name: "Hasta",
      menu: ["Hasta Ekle", "Hasta Listesi", "Hasta Dosyası", "Döküman Ekle"],
      icon: "fa-heartbeat",
    },
    {
      name: "Duyuru Panosu",
      menu: ["Duyuru Ekle", "Bütün Duyurular"],
      icon: "fa-bullhorn",
    },
    {
      name: "Faturalandırma",
      menu: ["Fatura Oluştur", "Bütün Faturalar"],
      icon: "fa-credit-card",
    },
    {
      name: "İnsan Kaynakları",
      menu: ["Çalışan Ekle", "Çalışan Listesi"],
      icon: "fa fa-users",
    },
    {
      name: "SMS / Mail Gönderme",
      menu: ["SMS Gönder", "Mail Gönder", "Gönderilen SMS / Mailler"],
      icon: "fa-envelope-o",
    },
    {
      name: "Tatil Planları",
      menu: ["Tatil Ekle", "Tatil Planları"],
      icon: "fa-plane",
    },
    {
      name: "Ayarlar",
      menu: ["Uygulama Ayarları", "Dil Ayarları"],
      icon: "fa-cogs",
    },
  ];

  const [sidebaritemselect, setSidebaritemselect] = useState([
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ]);

  const updateselectedsidebaritem = (index) => {
    setSidebaritemselect(
      sidebaritemselect.map((item, i) => {
        if (i === index) {
          return !item;
        } else {
          return (item = false);
        }
      })
    );
  };

  return (
    <div
      className={!hidesidebar ? "sidebar" : "hidesidebar"}
      style={SidebarStyle}
    >
      <div
        className="hidesidebarbutton"
        id={!hidesidebar ? "hidebutton" : "extendbutton"}
        onClick={() => {
          setHidesidebar(!hidesidebar);
          setSidebaritemselect(
            sidebaritemselect.map((item, i) => {
              return false;
            })
          );
        }}
      >
        <span>
          {hidesidebar ? (
            <i class="fa fa-angle-double-right" aria-hidden="true"></i>
          ) : (
            <i class="fa fa-angle-double-left" aria-hidden="true"></i>
          )}{" "}
        </span>{" "}
      </div>
      <section className="sidebar-logo">
        <img src={require(`../assets/${company[0].image}`)}></img>
      </section>
      <section className="sidebar-person">
        <img src={require(`../assets/${user[0].image}`)}></img>
        <div className="sidebar-person-title">
          {" "}
          <h1>{user[0].username}</h1>
          <h3>
            <i class="fa fa-user-circle-o" aria-hidden="true"></i>
            &nbsp; {user[0].authority}
          </h3>{" "}
        </div>{" "}
      </section>
      <section className="searchbox">
        {!hidesidebar ? (
          <input
            type="text"
            id="searchtext"
            name="fname"
            placeholder="Hasta Bul"
          ></input>
        ) : (
          <div className="hidesidebar-searchbox">
            <span>
              <i class="fa fa-search" aria-hidden="true"></i>
            </span>
          </div>
        )}
      </section>
      <section className={!hidesidebar ? "sidebar-menu" : "hidesidebar-menu"}>
        <ul>
          {sidebaritems.map((item, index) => {
            return (
              <li key={index} className="sidebar-menu-item">
                <a
                  onClick={() => updateselectedsidebaritem(index)}
                  style={
                    sidebaritemselect[index]
                      ? selectedListItemBackgroundColor
                      : notSelectedListItemBackgroundColor
                  }
                >
                  {" "}
                  <span>
                    {" "}
                    <i class={`fa ${item.icon}`} aria-hidden="true"></i>
                  </span>{" "}
                  {!hidesidebar ? (
                    <>
                      {" "}
                      <h1>{item.name}</h1>
                      {sidebaritemselect[index] ? (
                        <i
                          class="fa fa-angle-up pullright"
                          aria-hidden="true"
                        ></i>
                      ) : (
                        <i
                          class="fa fa-angle-down pullright"
                          aria-hidden="true"
                        ></i>
                      )}
                    </>
                  ) : (
                    <></>
                  )}
                </a>

                <ul
                  style={itemTreeStyle}
                  className={
                    sidebaritemselect[index] ? "itemtree" : "hide-itemtree"
                  }
                  id={hidesidebar ? "smallitemtree" : ""}
                >
                  {item.menu.map((menuitem, index) => {
                    return (
                      <li key={index}>
                        <Link to={`/${menuitem.replace(/\s/g, "")}`}>
                          {" "}
                          <h4>{menuitem}</h4>{" "}
                        </Link>{" "}
                      </li>
                    );
                  })}
                </ul>
              </li>
            );
          })}
        </ul>
      </section>
      <section className="theme-sign-out-button">
        {/* <div className="themebutton">
          <div class="themetoggle">
            <input
              type="checkbox"
              id="themeswitch"
              onChange={() => {
                setisDark(!isDark);
              }}
            />
            <label id="switchlabel" for="themeswitch">
              <span>
                <i class="fa-solid fa-sun"></i> <i class="fa-solid fa-moon"></i>
              </span>
            </label>
          </div>
        </div> */}
        <div style={{ height: 40 }}></div>
        <div className="sign-out">
          <div>
            <span>
              <i class="fa fa-sign-out fa-rotate-180 " aria-hidden="true"></i>
            </span>
          </div>
          <div>
            {" "}
            <h5>Çıkış Yap</h5>{" "}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Sidebar;
