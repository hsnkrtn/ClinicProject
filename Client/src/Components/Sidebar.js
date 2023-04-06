import React, { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { Sidebarinfo } from "../App";
import { Link } from "react-router-dom";

function Sidebar() {
  const { hidesidebar, setHidesidebar } = useContext(Sidebarinfo);

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
      menu: ["Randevu Ekle", "Randevu Listesi"],
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
      name: "Doktor",
      menu: ["Doktor Ekle", "Doktor Listesi"],
      icon: "fa-user-md",
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
      name: "SMS Gönderme",
      menu: ["SMS Gönder", "Gönderilen SMS'ler"],
      icon: "fa-comments-o",
    },
    {
      name: "Mail Gönderme",
      menu: ["Mail Gönder", "Gönderilen Mailler"],
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
    <div className="sidebar-header">
      <div className={hidesidebar ? "hidesidebar" : "sidebar"}>
        <section className="sidebar-logo">
          <img src={require(`../assets/${company[0].image}`)}></img>
        </section>
        <section
          className={hidesidebar ? "hidesidebar-person" : "sidebar-person"}
        >
          <img src={require(`../assets/${user[0].image}`)}></img>
          <h1>{user[0].username}</h1>
          <h3>
            <i class="fa fa-user-circle-o" aria-hidden="true"></i>
            {user[0].authority}
          </h3>
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
            <></>
          )}
        </section>
        <ul className="sidebar-menu">
          {sidebaritems.map((item, index) => {
            return (
              <li
                key={index}
                className={
                  hidesidebar ? "hidesidebar-menu-item" : "sidebar-menu-item"
                }
              >
                <a onClick={() => updateselectedsidebaritem(index)}>
                  {" "}
                  <span className="sidebaricons">
                    {" "}
                    <i class={`fa ${item.icon}`} aria-hidden="true"></i>
                  </span>{" "}
                  <h1>{item.name}</h1>
                  {!hidesidebar ? (
                    <>
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
                  className={
                    sidebaritemselect[index] ? "itemtree" : "hide-itemtree"
                  }
                  id={hidesidebar ? "smallitemtree" : ""}
                >
                  {item.menu.map((menuitem, index) => {
                    return (
                      <li key={index}>
                        <Link
                          to={{
                            pathname: `/${menuitem.replace(/\s/g, "")}`,
                          }}
                        >
                          {" "}
                          <i class="fa  fa-angle-right" aria-hidden="true"></i>
                          <h4>{menuitem}</h4>{" "}
                        </Link>
                      </li>
                    );
                  })}
                </ul> 
              </li>
            );
          })}
        </ul>
      </div>
      <div className={hidesidebar ? "extendheader" : "header"}>
        <div
          className="hide-menu"
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
          </span>
        </div>
        <div className="header-title">
          {" "}
          {sidebaritemselect &&
            sidebaritemselect.map((item, index) => {
              if (item) {
                return (
                  <div className="header-title-content">
                    {" "}
                    <span>
                      {" "}
                      <i
                        class={`fa ${sidebaritems[index].icon}`}
                        aria-hidden="true"
                      ></i>
                    </span>{" "}
                    <h1> {sidebaritems[index].name}</h1>
                  </div>
                );
              }
            })}{" "}
        </div>
        <div className="hide-menu">
          <span>
            <i class="fa fa-bars" aria-hidden="true"></i>
          </span>
        </div>
      </div>{" "}
    </div>
  );
}

export default Sidebar;
